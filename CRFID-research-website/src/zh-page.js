const source = await fetch('index.html').then((response) => {
  if (!response.ok) throw new Error(`Unable to load case study: ${response.status}`);
  return response.text();
});

const page = new DOMParser().parseFromString(source, 'text/html');
page.documentElement.lang = 'zh-CN';
page.title = 'CRFID 域泛化研究 | Yangdeyi Yang';
page.querySelector('meta[name="description"]')?.setAttribute('content', '无芯片 RFID 标签识别在读写器位置变化下的域泛化研究。');
page.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://derekamethy.github.io/CRFID-research-website/zh.html');

const copy = new Map([
  ['Skip to main content', '跳至正文'],
  ['Menu', '菜单'], ['Close', '关闭'], ['Overview', '概览'], ['Experiment', '实验'], ['Evidence', '证据'], ['Methods', '方法'], ['Back to portfolio', '返回作品集'], ['Read in English', 'English'],
  ['The transfer problem', '迁移问题'], ['A strict test', '严格测试'], ['What changed?', '发生了什么？'], ['Diagnosis', '诊断'], ['Mechanism tests', '机制测试'], ['Target access', '目标条件访问'], ['Conclusions', '结论'], ['Technical evidence', '技术证据'],
  ['CRFID domain generalisation under reader-position shift', '读写器位置变化下的 CRFID 域泛化'],
  ['Can the same physical tag still be recognised when the reader moves to a geometry the model has never seen?', '当读写器来到模型从未见过的几何条件时，系统还能否识别同一枚实体标签？'],
  ['A physical pattern', '实体图案'], ['A radio response', '射频响应'], ['A curve of measurements', '测量曲线'], ['A predicted identity', '预测的标签身份'],
  ['The tag stays the same. Its measured response may not.', '标签本身不变，但测得的响应可能改变。'],
  ['Same tag. Four reader positions. Four different-looking spectra.', '同一标签、四个读写器位置、四种不同的频谱形态。'],
  ['What happens at the missing corner?', '缺失的几何组合会发生什么？'], ['Group the physical conditions', '按物理条件分组'], ['Select using source evidence', '仅凭源域证据选择'], ['Freeze the complete recipe', '冻结完整方案'],
  ['Why this recipe?', '为什么采用这套方案？'], ['Why more than accuracy?', '为什么不能只看准确率？'],
  ['Correct Tag-6 predictions across five seeds.', '五个随机种子下对 Tag-6 的正确预测。'], ['Five seeds, one held geometry', '五个随机种子，一个留出几何条件'],
  ['01 / Is the measurement already difficult?', '01 / 测量本身是否已经困难？'], ['Within-position recognition', '位置内识别'], ['Angle-associated block-accuracy contrast', '与角度相关的条件块准确率对比'],
  ['02 / Do the learned features transfer?', '02 / 学到的特征能迁移吗？'], ['Can a simple classifier recover tag identity?', '简单分类器能否恢复标签身份？'], ['The embedding reveals where a measurement came from.', '嵌入表征暴露了测量来自哪个位置。'],
  ['Make position harder to decode.', '让位置更难被解码。'], ['No reliable matched P4 improvement', '没有可靠的 P4 配对提升'],
  ['03 / Can a new classification rule help?', '03 / 新的分类规则能否帮助？'], ['Held-condition Macro-F1', '留出条件的 Macro-F1'], ['Then allow the encoder to adapt.', '再允许编码器适配目标条件。'],
  ['Some difficulty exists before the network.', '部分困难在进入网络之前就已存在。'], ['Source discrimination need not transfer.', '源域可分性并不必然迁移。'], ['A replacement head is only part of the question.', '替换分类头只是问题的一部分。'], ['Engineering capabilities demonstrated', '项目展现的工程能力'], ['Test new measurement conditions with a fixed protocol.', '以固定协议测试新的测量条件。'],
  ['Domain Generalization for Depolarizing Chipless-RFID Tag Identification under Position Shift', '位置变化下去极化无芯片 RFID 标签识别的域泛化'], ['Explore the experiments, code and result evidence.', '查看实验、代码与结果证据。'], ['Mixup never became a performance experiment.', 'Mixup 从未进入性能比较实验。'], ['Class-recall evidence', '类别召回率证据'],
  ['Inside the sensor data', '传感数据内部'], ['What “RAW” means here', '这里“原始数据”的含义'], ['Selection logic, metrics and uncertainty', '选择逻辑、指标与不确定性'], ['Historical context: what the 73.44% result does—and does not—show', '历史背景：73.44% 的结果说明了什么、没有说明什么'],
  ['Training variability: the five individual runs', '训练波动：五次独立运行'], ['Acquisition intervals and pairing rules', '采集区间与配对规则'], ['Probe protocol, exact means and contrast definition', '探针协议、精确均值与对比定义'], ['Check the mechanism test', '检查机制测试'], ['IRM — seek a predictor stable across source environments', 'IRM：寻找跨源环境稳定的预测器'], ['GroupDRO — protect the weakest source environment', 'GroupDRO：保护最弱的源环境'], ['Exact branch-matched endpoints', '严格分支匹配的终点'], ['Keep the target-assisted studies separate', '将目标辅助研究与迁移研究分开'], ['Why 57.71% accuracy and 0.9835 Macro-F1 are not transfer solutions', '为什么 57.71% 准确率和 0.9835 Macro-F1 不是迁移解决方案'],
  ['Why the Mixup experiment stopped before training', '为什么 Mixup 实验在训练前停止'], ['Reproducibility: what was independently checked?', '可复现性：哪些内容被独立检查？'], ['External data and self-supervision Scoped portability, no transfer rescue', '外部数据与自监督：限定可移植性，并非迁移补救'], ['OpenEMS design exploration Confirmation criteria not met', 'OpenEMS 设计探索：未满足确认标准'], ['Peak and noise hypotheses Negative and validity-limited evidence', '峰值与噪声假设：阴性且受有效性限制的证据'],
  ['Direct links', '直接链接'], ['Dissertation', '论文'], ['Repository', '代码仓库'], ['Portfolio', '作品集'],
  ['Same tag.', '同一标签。'], ['New geometry.', '新的几何条件。'], ['Different answer.', '不同的结果。'],
  ['Recognising a chipless RFID tag when the reader moves.', '读写器移动后，仍然识别无芯片 RFID 标签。'],
  ['A chipless tag carries identity in its electromagnetic response. I investigated whether machine learning could recognise seven tag identities when the reader’s distance and angle changed.', '无芯片标签通过电磁响应携带身份信息。我研究了当读写器的距离和角度发生变化时，机器学习能否仍识别七种标签身份。'],
  ['My role', '我的工作'], ['Signal processing, ML evaluation and failure analysis using an existing UCC / Tyndall measurement campaign.', '基于 UCC / Tyndall 已有测量活动，完成信号处理、机器学习评估与失效分析。'],
  ['A patterned tag shapes the reflected signal. The challenge: recognise its identity even when the measurement changes. Schematic only; tag shape and trace are illustrative.', '带图案的标签会塑造反射信号。挑战在于：即使测量条件变化，也要识别其身份。示意图仅用于说明，标签形状和曲线均非实物复现。'],
  ['MEngSc research · Yangdeyi Yang · University College Cork / Tyndall National Institute. Analysis of an existing measurement campaign; my contribution is the ML evaluation and investigation.', 'MEngSc 研究 · 杨德意 · 科克大学 / Tyndall 国家研究院。分析基于已有测量活动；我的贡献是机器学习评估与研究诊断。'],
  ['How a tag becomes', '标签如何变成'], ['a spectrum.', '一条频谱。'],
  ['Think of a chipless RFID tag as an electromagnetic barcode. Its patterned metal structure shapes how it reflects radio waves. In this project, a model uses that response to distinguish seven tag identities.', '可以把无芯片 RFID 标签理解为电磁条形码：其带图案的金属结构决定了它反射无线电波的方式。本项目中的模型利用这一响应区分七种标签身份。'],
  ['The tag’s resonant structure carries its identity without an electronic chip.', '标签的谐振结构无需电子芯片也能承载身份信息。'], ['The reader illuminates the tag; the reflected response varies with frequency.', '读写器照射标签，反射响应随频率变化。'], ['A spectrum records response magnitude across frequency: the model’s input.', '频谱记录不同频率上的响应幅值，是模型的输入。'], ['The model extracts patterns in the curve and assigns one of seven tag labels.', '模型从曲线中提取模式，并分配七种标签之一。'],
  ['A useful recognition system should tolerate changes in how the reader is positioned. The research question is whether a model can recognise identity across those changes, rather than rely on patterns specific to familiar setups.', '有用的识别系统应能容忍读写器摆放方式的变化。这里的问题是：模型能否跨越这些变化识别身份，而不是依赖熟悉设置中特有的模式。'], ['Tag identity + geometry + material + surface + noise', '标签身份 + 几何条件 + 材料 + 表面 + 噪声'],
  ['Each line is the same tag measured at a different reader position. The horizontal axis is frequency; the vertical axis is normalised response magnitude. The changing curve shows why recognising the tag at a new position is a different task from recognising another familiar measurement.', '每条曲线都是同一标签在不同读写器位置下的测量结果。横轴为频率，纵轴为归一化响应幅值。曲线的变化表明：在新位置识别标签，与识别另一条熟悉测量并不是同一个任务。'],
  ['Illustrative measured example; it does not identify one unique physical cause of the shift. The plotted GHz axis is nominal; exact sample-by-sample frequency coordinates are unavailable.', '这是说明性的实测例子，不能据此确定变化的单一物理原因。图中的 GHz 坐标为名义坐标，缺少逐样本的精确频率位置。'],
  ['RAW is the supplied 281-point cross-polar radar-cross-section magnitude representation, already cropped from the instrument sweep. The intended band is 5–8 GHz, but the authoritative sample-by-sample frequency axis and crop indices are unavailable. Phase and richer polarimetric channels are also unavailable.', 'RAW 是提供的 281 点交叉极化雷达散射截面幅值表示，已从仪器扫频中裁剪。目标频段为 5–8 GHz，但缺少权威的逐样本频率轴和裁剪索引；相位及更丰富的极化通道也不可用。'],
  ['First differencing emphasises local spectral changes and reduces sensitivity to slowly varying baseline structure. The encoder converts these samples into 256 learned features.', '一阶差分强调局部频谱变化，并降低对缓慢变化基线结构的敏感性。编码器再将这些样本转换为 256 个学习特征。'],
  ['To test recognition under change, I needed to keep an entire reader geometry outside model development.', '为测试变化条件下的识别能力，我需要把完整的一个读写器几何条件排除在模型开发之外。'],
  ['Train on three geometries.', '在三个几何条件上训练。'], ['Test on the fourth.', '在第四个条件上测试。'],
  ['I asked whether a model developed at three reader positions could recognise tags at a fourth: a new combination of distance and angle. This is domain generalisation—testing an environment excluded from model development.', '我测试了在三个读写器位置上开发的模型，能否识别第四个位置的标签；后者是距离与角度的新组合。这就是域泛化：测试一个被排除在模型开发之外的环境。'],
  ['P1–P3 provide training and model-selection data. P4 combines the longer distance and rotated angle, and is reserved for final scoring.', 'P1–P3 提供训练和模型选择数据。P4 同时具有更长距离和旋转角度，仅保留给最终评分。'],
  ['Strict source-only evaluation: no P4 measurements or labels are used to fit preprocessing, train the model or choose the recipe in this experiment.', '严格的仅源域评估：本实验不使用任何 P4 测量或标签来拟合预处理、训练模型或选择方案。'], ['This tests a held geometry within one measurement campaign, not a new installation or independent acquisition.', '这测试的是一次测量活动内的留出几何条件，不代表新的安装现场或独立采集。'],
  ['12,600 rows ≠ 12,600', '12,600 行数据 ≠ 12,600 次'], ['independent experiments.', '独立实验。'], ['Each physical condition was swept 50 times. Different rows can describe the same tag, material, surface and geometry.', '每个物理条件扫描 50 次。不同数据行可能描述同一标签、材料、表面和几何条件。'], ['7 tags × 3 permittivities × 3 surfaces × 4 positions = 252 blocks. These are physical conditions within one campaign, not 252 independent campaigns.', '7 种标签 × 3 种介电常数 × 3 种表面 × 4 个位置 = 252 个条件块。它们是同一次活动内的物理条件，而非 252 次独立采集。'], ['One condition. One split assignment. All 50 sweeps remain together across the principal train/test boundaries.', '一个物理条件只对应一次划分分配，50 次扫描在主要训练/测试边界上始终保持在一起。'],
  ['Keep related sweeps together. Fit preprocessing state only on permitted source training data.', '将相关扫描保持在一起。预处理状态只在允许使用的源域训练数据上拟合。'], ['Compare four candidate pipelines by taking turns holding out a source position. Choose the strongest worst-position Macro-F1, a score that gives each tag class equal weight.', '轮流留出一个源域位置，比较四条候选流程。选择最差位置 Macro-F1 最高的方案；该指标对每个标签类别等权。'], ['Freeze the selected preprocessing and neural network before scoring P4. Repeat training with five random seeds to examine training variability.', '在对 P4 评分前冻结选定的预处理和神经网络，并以五个随机种子重复训练来检查训练波动。'],
  ['63 held condition blocks.', '63 个留出条件块。'], ['3,150 measurement rows.', '3,150 行测量数据。'], ['Evaluate the frozen models across five seeds. Examine accuracy, Macro-F1 and per-class recall.', '在五个随机种子下评估冻结后的模型，并检查准确率、Macro-F1 和逐类别召回率。'], ['Scope: the wider research programme had previously examined P4 in other lineages. Strict-DG describes the controlled computation and selection boundary; this is not a historically untouched prospective-target study.', '范围说明：更广泛的研究计划曾在其他分支中考察 P4。Strict-DG 描述的是受控的计算与选择边界，并非历史上从未接触过目标域的前瞻性研究。'],
  ['I translated the recognition question into a grouped test and a model-selection process that excludes the held geometry.', '我将识别问题转化为按物理条件分组的测试，以及排除留出几何条件的模型选择流程。'], ['With the complete pipeline fixed, I could measure recognition at P4.', '完整流程固定后，我才能测量在 P4 上的识别表现。'],
  ['Recognition stayed near', '识别表现仍接近'], ['the chance reference.', '随机猜测基线。'], ['The selected pipeline averaged 15.66% accuracy at the held geometry. With seven balanced classes, uniform random guessing has a 14.29% accuracy reference. Some tags were almost never identified correctly.', '选定流程在留出几何条件上的平均准确率为 15.66%。七个类别平衡时，均匀随机猜测的准确率基线为 14.29%。某些标签几乎从未被正确识别。'], ['Accuracy · population SD 3.05 percentage points', '准确率 · 总体标准差 3.05 个百分点'], ['Macro-F1 · population SD 0.0190', 'Macro-F1 · 总体标准差 0.0190'], ['Balanced seven-class uniform-random accuracy reference: 1/7 ≈ 14.29%. A descriptive reference, not a formal significance test.', '七类平衡下均匀随机猜测的准确率基线：1/7 ≈ 14.29%。这只是描述性参照，不是正式显著性检验。'], ['Predictions concentrated on a restricted subset of classes. Per-class recall establishes collapse; low Macro-F1 alone does not.', '预测集中在有限的类别子集上。逐类别召回率能证明类别坍塌，而低 Macro-F1 本身不足以说明这一点。'],
  ['The next question was where recognition broke down: the measurement, the learned features or the final classification rule?', '接下来的问题是：识别究竟在哪一步失效——测量本身、学习到的特征，还是最终的分类规则？'],
  ['Follow the signal.', '沿着信号链'], ['Inspect each stage.', '逐步检查。'],
  ['I split the investigation into three questions: is the signal already difficult to distinguish, do the learned features retain useful information, and can a different classification rule help? These are follow-up diagnostics, not replacements for the held-geometry result.', '我将研究拆为三个问题：信号本身是否已经难以区分；学习到的特征是否仍保留有用信息；不同的分类规则能否帮助。这些是后续诊断，并不能替代留出几何条件的核心结果。'],
  ['I trained and tested separately at each position, keeping physical-condition blocks separate. Both rotated positions, P2 and P4, performed poorly. This points to an angle-associated difficulty, rather than a problem unique to the held position; it does not identify a single physical cause.', '我在每个位置分别训练和测试，并保持物理条件块相互独立。两个旋转位置 P2 和 P4 表现都较差。这指向与角度有关的困难，而不是留出位置独有的问题；但不能据此锁定单一物理原因。'],
  ['The encoder is the part of the network that turns a spectrum into learned features. I tested those features with a simple classifier—a linear probe—and compared them with the original signal. At P4, the original signal gave a higher mean probe score. The strength of this evidence depends on how training variability is accounted for.', '编码器是将频谱转换为学习特征的网络部分。我用简单的线性探针测试这些特征，并将其与原始信号比较。在 P4 上，原始信号给出了更高的平均探针得分；这一证据的强度取决于如何计入训练波动。'],
  ['The learned features also reveal the reader position.', '学习特征还暴露了读写器位置。'],
  ['I tested whether discouraging that information could improve tag recognition. Each method was compared with an ordinary-training baseline using matched settings and seeds.', '我测试了抑制这类位置信息能否改善标签识别。每种方法均在匹配设置与随机种子下，与普通训练基线比较。'],
  ['What if we can label', '如果能够标注'], ['the new position?', '新位置的数据呢？'],
  ['So far, the primary model had to transfer without P4 data during development. Here I changed the assumption: labelled examples from P4 become available for calibration. This is a separate adaptation study with its own held-condition test.', '此前，主模型在开发阶段不能使用 P4 数据，必须直接迁移。这里我改变这一假设：允许使用带标签的 P4 样本进行校准。这是一项独立的适配研究，有自己的留出条件测试。'],
  ['What this investigation', '本研究'], ['established—and taught me.', '确立了什么，也教会了我什么。'],
  ['The tested pipeline did not reliably recognise tags at the held geometry. The follow-up experiments found angle-associated difficulty and evidence of a representation-transfer limitation, with uncertainty. They did not isolate one cause or establish a reliable remedy.', '被测试的流程无法可靠识别留出几何条件下的标签。后续实验发现了与角度相关的困难，以及表征迁移受限的证据，但存在不确定性；它们没有锁定单一原因，也没有建立可靠的补救办法。'],
  ['The transferable skill: designing meaningful tests for machine learning on physical sensor data. The same reasoning pattern applies whenever a physical sensor sees a shifted environment: define the real deployment unit, keep evaluation boundaries honest, then debug the measurement, representation and decision rule separately.', '可迁移的能力，是为物理传感数据上的机器学习设计有意义的测试。只要物理传感器面对变化环境，同一推理框架都适用：定义真实部署单位，诚实地保持评估边界，再分别排查测量、表征和决策规则。'],
]);

const translate = (value) => {
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  const key = value.trim();
  return copy.has(key) ? `${leading}${copy.get(key)}${trailing}` : value;
};

const walker = page.createTreeWalker(page.body, NodeFilter.SHOW_TEXT);
for (let node = walker.nextNode(); node; node = walker.nextNode()) node.nodeValue = translate(node.nodeValue);

for (const element of page.querySelectorAll('[aria-label], [title], img[alt]')) {
  for (const attribute of ['aria-label', 'title', 'alt']) {
    if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
  }
}

const englishLink = [...page.querySelectorAll('a')].find((link) => link.textContent.trim() === 'English');
if (englishLink) englishLink.href = 'index.html';

const scripts = [...page.scripts].map((script) => ({ src: script.getAttribute('src'), type: script.getAttribute('type') }));
for (const script of page.scripts) script.remove();
document.documentElement.innerHTML = page.documentElement.innerHTML;
for (const { src, type } of scripts) {
  if (!src) continue;
  const script = document.createElement('script');
  script.src = src;
  if (type) script.type = type;
  document.body.append(script);
}
