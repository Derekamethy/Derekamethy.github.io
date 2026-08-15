# Personal Portfolio V1.1 GPT Review Packet

This packet contains the full source code and automated visual evidence for Derek Yang's Personal Portfolio V1.1.
The portfolio is designed as an independent landing page that links to the frozen CRFID flagship repository.

## 1. Overview
The V1.1 iteration adds targeted visual and content polish based on prior review:
- Adds authentic CRFID lab/measurement hero photograph to the flagship project card.
- Compresses Work/Method summaries to 4 high-value items.
- Compresses Capabilities groups to 4 items each.
- Fixes Bachelor timeline duplication.
- Removes "pending confirmation" internal message from the Contact section.
- Ensures GitHub CTA touch target on mobile is min-height: 44px.

## 2. Contents

### Source Code
- `index.html`: The HTML structure of the portfolio.
- `style.css`: The CSS styles.

### Automated Evidence (`.gpt-review/screenshots/`)

**Full-Page Viewports:**
- `desktop-1440x900.png` (SHA256: edad29f632f4bdb937e9384968668a8946a8d2e9588c51291a54572f32bcaa86)
- `desktop-1280x800.png` (SHA256: d082d525ec873d89a4fd73e33c335f013a453046c7a39744ac6132620131c965)
- `tablet-768x1024.png` (SHA256: 589d173b6794302802e76ec23aecb330465acd96d5be2be6f45834adb735108e)
- `mobile-430x932.png` (SHA256: 958a63a262a7bd7d0e3b8261435626bd261b48e979f75efff19f850a3939aae7)
- `mobile-390x844.png` (SHA256: da0f456449049d9bce5f9d38ffecce08aac0ccc80876453055819b6bd02ea522)

**Focused Elements (from 1440x900):**
- `hero.png` (SHA256: fa8fb1954b9169c0c64d3e5816e2bbb1c62869e0ea38ce57058b9a50fb1489c6)
- `selected-work.png` (SHA256: 27199416aef476c148d3389405eb06e9ab35b2570b8875e267be2721a3970c4a)
- `crfid-flagship.png` (SHA256: 24e63e6f85c2cde69c3b01fd4d23ec91e84e829025f8dfc210c0c99ca2472c1e)
- `capabilities.png` (SHA256: 12f32b6a724bbcfde563e9b0daec595811f0d7a1c8d22f1405a437bd4ad26982)
- `contact.png` (SHA256: 861b0e3f4f140ca877f51ab1c89479d281d2858cc031fd80639bc002845422ce)

### Validation Reports
- `.gpt-review/validation.txt`: Playwright-extracted DOM metrics confirming exactly 0 horizontal overflow across all 5 viewports, and measuring touch target heights on mobile.
- `.gpt-review/browser_console.txt`: Playwright-extracted network and console logs confirming 0 errors and 0 404s.

## 3. Deployment Status
Deployment is DEFERRED until visual/content review is complete.
No remote repository has been created.
The frozen CRFID repository remains untouched.
