import asyncio
import http.server
import socketserver
import threading
import os
import json
import hashlib
from playwright.async_api import async_playwright
import PIL.Image

PORT = 8000
URL = f"http://localhost:{PORT}"

def serve():
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

def get_hash(filepath):
    if not os.path.exists(filepath):
        return None
    sha256_hash = hashlib.sha256()
    with open(filepath,"rb") as f:
        for byte_block in iter(lambda: f.read(4096),b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

async def main():
    server_thread = threading.Thread(target=serve, daemon=True)
    server_thread.start()

    viewports = [
        {"name": "desktop-1440x900", "width": 1440, "height": 900},
        {"name": "desktop-1280x800", "width": 1280, "height": 800},
        {"name": "tablet-768x1024", "width": 768, "height": 1024},
        {"name": "mobile-430x932", "width": 430, "height": 932},
        {"name": "mobile-390x844", "width": 390, "height": 844},
    ]

    results = []
    
    os.makedirs(".gpt-review/screenshots", exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        for vp in viewports:
            context = await browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = await context.new_page()
            
            console_errors = 0
            console_warnings = 0
            page_errors = 0
            failed_requests = 0
            status_404_count = 0
            paths_404 = []
            
            page.on("console", lambda msg: globals().update(console_errors=console_errors + 1) if msg.type == "error" else (globals().update(console_warnings=console_warnings + 1) if msg.type == "warning" else None))
            page.on("pageerror", lambda err: globals().update(page_errors=page_errors + 1))

            def handle_response(response):
                nonlocal status_404_count, paths_404
                if response.status == 404:
                    status_404_count += 1
                    paths_404.append(response.url)
            
            def handle_request_failed(request):
                nonlocal failed_requests
                failed_requests += 1

            page.on("response", handle_response)
            page.on("requestfailed", handle_request_failed)

            await page.goto(URL, wait_until="networkidle")
            
            filepath = f".gpt-review/screenshots/{vp['name']}.png"
            await page.screenshot(path=filepath, full_page=True)
            
            img = PIL.Image.open(filepath)
            
            metrics = await page.evaluate('''() => {
                return {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    clientWidth: document.documentElement.clientWidth,
                    scrollWidth: document.documentElement.scrollWidth,
                    scrollHeight: document.documentElement.scrollHeight
                }
            }''')
            
            horizontal_overflow = metrics["scrollWidth"] > metrics["clientWidth"]
            
            touch_targets = {}
            if vp["width"] == 390:
                touch_targets = await page.evaluate('''() => {
                    const heroPrimary = document.querySelector('.hero-actions .btn-primary');
                    const heroSecondary = document.querySelector('.hero-actions .btn-secondary');
                    const githubLink = document.querySelector('.hero-actions .link-subtle');
                    const projectLink = document.querySelector('.project-actions .btn-primary');
                    return {
                        "primary Hero CTA": heroPrimary ? {w: heroPrimary.getBoundingClientRect().width, h: heroPrimary.getBoundingClientRect().height} : null,
                        "secondary Hero CTA": heroSecondary ? {w: heroSecondary.getBoundingClientRect().width, h: heroSecondary.getBoundingClientRect().height} : null,
                        "GitHub CTA": githubLink ? {w: githubLink.getBoundingClientRect().width, h: githubLink.getBoundingClientRect().height} : null,
                        "CRFID project CTA": projectLink ? {w: projectLink.getBoundingClientRect().width, h: projectLink.getBoundingClientRect().height} : null,
                    }
                }''')

            results.append({
                "viewport_name": vp["name"],
                "requested_size": f"{vp['width']}x{vp['height']}",
                "metrics": metrics,
                "horizontal_overflow": horizontal_overflow,
                "console_errors": console_errors,
                "console_warnings": console_warnings,
                "page_errors": page_errors,
                "failed_requests": failed_requests,
                "status_404_count": status_404_count,
                "paths_404": paths_404,
                "screenshot_path": filepath,
                "screenshot_size": os.path.getsize(filepath) if os.path.exists(filepath) else 0,
                "png_width": img.width,
                "png_height": img.height,
                "hash": get_hash(filepath),
                "touch_targets": touch_targets
            })
            
            if vp["name"] == "desktop-1440x900":
                focused = [
                    ("hero", "#hero"),
                    ("selected-work", "#work"),
                    ("crfid-flagship", "#crfid-flagship"),
                    ("capabilities", "#capabilities"),
                    ("contact", "#contact")
                ]
                for name, selector in focused:
                    el = await page.query_selector(selector)
                    if el:
                        await el.scroll_into_view_if_needed()
                        path = f".gpt-review/screenshots/{name}.png"
                        await el.screenshot(path=path)
                        img2 = PIL.Image.open(path)
                        results.append({
                            "focused_name": name,
                            "target": selector,
                            "png_width": img2.width,
                            "png_height": img2.height,
                            "screenshot_size": os.path.getsize(path),
                            "hash": get_hash(path)
                        })

            await context.close()
        
        await browser.close()
    
    with open("results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    asyncio.run(main())
