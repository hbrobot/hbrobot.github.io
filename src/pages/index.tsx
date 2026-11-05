import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import {products, type Product} from '@site/src/data/products';
import {tools, categoryById} from '@site/src/data/tools';
import {
  AmrAIllustration,
  AmrBIllustration,
} from '@site/src/components/ProductIllustrations';
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Layers,
  LifeBuoy,
  MapIcon,
  Plus,
  Sparkles,
  Wrench,
} from '@site/src/components/Icons';

import styles from './index.module.css';

const stats = [
  {value: String(products.filter((product) => !product.placeholder).length), label: '已上线机型'},
  {value: String(products.length), label: '机型专区'},
  {value: '4', label: '通用模块'},
  {value: String(tools.length), label: '调试工具'},
];

const learningPath = [
  {
    step: '01',
    title: '产品认知',
    description: '查看产品定位、能力范围、规格参数与安全说明。',
    to: '/amr-a',
    label: '产品概览',
    color: 'mint',
  },
  {
    step: '02',
    title: '首次上手',
    description: '完成设备检查、上电、网络连接与基础运动测试。',
    to: '/amr-a/quick-start/device-check-and-boot',
    label: '快速开始',
    color: 'peach',
  },
  {
    step: '03',
    title: '开发准备',
    description: '配置 Ubuntu、ROS 2、VS Code 与 Python 依赖。',
    to: '/docs/software/preparation',
    label: '环境配置',
    color: 'blue',
  },
  {
    step: '04',
    title: '应用开发',
    description: '学习底盘控制、传感器、视觉识别与综合任务。',
    to: '/amr-a/applications',
    label: '控制与应用',
    color: 'lemon',
  },
] as const;

const modules = [
  {
    title: '开发环境配置',
    description: 'Ubuntu、ROS 2、VS Code、Python、NVIDIA 驱动与 Docker',
    count: 8,
    icon: Cpu,
    color: 'blue',
    to: '/docs/software',
  },
  {
    title: '基础教学',
    description: 'ROS 2 通信机制与 Python 编程基础，配套示例',
    count: 16,
    icon: BookOpen,
    color: 'mint',
    to: '/docs/basics',
  },
  {
    title: 'Ultralytics YOLO',
    description: '图像采集、数据标注、模型训练、导出与 MNN 部署',
    count: 6,
    icon: Layers,
    color: 'peach',
    to: '/docs/yolo',
  },
  {
    title: '常见问题',
    description: '环境、硬件、通信、运动与视觉问题的通用排错入口',
    count: 7,
    icon: LifeBuoy,
    color: 'lemon',
    to: '/docs/faq',
  },
] as const;

const faqLinks = [
  {
    question: '电脑连不上机器人怎么办？',
    tag: '网络',
    to: '/docs/faq/hardware-connection-qa',
  },
  {
    question: '导航时定位突然丢失怎么办？',
    tag: '导航',
    to: '/amr-a/faq',
  },
  {
    question: '机器人直线行驶跑偏怎么办？',
    tag: '运动',
    to: '/docs/faq/motion-control-qa',
  },
  {
    question: 'ROS 2 话题能发不能收，从哪里查？',
    tag: '通信',
    to: '/docs/faq/ros2-communication-qa',
  },
];

function RobotPhoto({className}: {className: string}) {
  const flagship = products[0];
  const imageSrc = useBaseUrl(flagship.image ?? '');

  return (
    <img
      src={imageSrc}
      alt={`${flagship.name} ${flagship.nameZh} 实机照片`}
      className={className}
      width={900}
      height={702}
      decoding="async"
    />
  );
}

function ProductArt({product}: {product: Product}) {
  const imageSrc = useBaseUrl(product.image ?? '');

  if (product.image) {
    return (
      <img
        src={imageSrc}
        alt={`${product.name} ${product.nameZh} 实机照片`}
        className={styles.productArtPhoto}
        width={900}
        height={702}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return product.illustration === 'amr-a' ? (
    <AmrAIllustration className={styles.productArtSvg} />
  ) : (
    <AmrBIllustration className={styles.productArtSvg} />
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.eyebrow}>
        <Sparkles className={styles.eyebrowIcon} />
        {eyebrow}
      </span>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function Hero() {
  const flagship = products[0];
  return (
    <header className={styles.hero}>
      <div className={styles.heroBlobs} aria-hidden="true">
        <span className={styles.blobMint} />
        <span className={styles.blobPeach} />
        <span className={styles.blobBlue} />
        <span className={styles.blobLemon} />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.heroBadge}>
            <Sparkles className={styles.badgeIcon} />
            WS2024-Lyon Agri-AMR · 农业自主移动机器人
          </span>
          <h1>
            移动机器人
            <br />
            <span className={styles.highlight}>技术文档</span>与开发手册
          </h1>
          <p className={styles.heroLead}>
            WS2024-Lyon Agri-AMR 技术文档与通用开发手册。产品专区涵盖设备检查、
            网络连接、参数标定与导航应用；通用章节提供 ROS 2、Python 与
            Ultralytics YOLO 的开发基础。
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/amr-a">
              进入 WS2024 专区
              <ArrowRight className={styles.buttonIcon} />
            </Link>
            <Link
              className={styles.ghostButton}
              to="/amr-a/quick-start/device-check-and-boot">
              快速上手
            </Link>
          </div>
          <div className={styles.stats}>
            {stats.map((item) => (
              <div key={item.label} className={styles.stat}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <span className={styles.visualTag}>Agri-AMR / ROS 2</span>
            <RobotPhoto className={styles.heroRobotPhoto} />
            <span className={clsx(styles.chip, styles.chipSlam)}>SLAM</span>
            <span className={clsx(styles.chip, styles.chipNav)}>Nav2</span>
            <span className={clsx(styles.chip, styles.chipYolo)}>YOLO</span>
            <span className={clsx(styles.chip, styles.chipRos)}>ROS 2</span>
            <div className={styles.visualFooter}>
              <div>
                <strong>{flagship.name}</strong>
                <span>{flagship.nameZh}</span>
              </div>
              <Link
                to={`/${flagship.id}`}
                aria-label={`查看 ${flagship.name} 文档`}
                className={styles.visualArrow}>
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className={styles.visualBadge}>
            <span className={styles.badgeDot} />
            WS2026 专区已预留
          </div>
        </div>
      </div>
    </header>
  );
}

function Products() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          id="products"
          eyebrow="Product Docs"
          title="产品文档"
          description="WS2024-Lyon Agri-AMR 文档已上线；WS2026 专区保留入口，正式资料确认后补充。"
        />
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/${product.id}`}
              className={clsx(
                styles.productCard,
                styles[product.accent],
                product.placeholder && styles.productPlaceholder,
              )}>
              <div className={styles.productCopy}>
                <div className={styles.productTop}>
                  <span className={styles.productStatus}>{product.status}</span>
                  <span className={styles.productIndex}>0{products.indexOf(product) + 1}</span>
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productNameZh}>{product.nameZh}</p>
                <p className={styles.productSubtitle}>{product.subtitle}</p>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productTags}>
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.productLinks}>
                  {product.placeholder ? (
                    <span>产品资料筹备中</span>
                  ) : (
                    <>
                      <span>快速开始</span>
                      <span>硬件与结构</span>
                      <span>参数配置</span>
                      <span>控制与应用</span>
                    </>
                  )}
                </div>
                <span className={styles.productCta}>
                  查看 {product.name} 专区
                  <ArrowRight className={styles.buttonIcon} />
                </span>
              </div>
              <div className={styles.productArt}>
                <ProductArt product={product} />
              </div>
            </Link>
          ))}
          <div className={styles.moreProduct}>
            <div className={styles.moreIcon}>
              <Plus />
            </div>
            <div>
              <strong>更多机型文档</strong>
              <p>后续机型将沿用现有产品文档结构，相关章节随资料确认后补充。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningAndModules() {
  return (
    <section className={styles.learningSection}>
      <div className="container">
        <SectionHeading
          eyebrow="Documentation Map"
          title="学习路径与内容模块"
          description="按产品上手顺序查阅文档；通用内容按知识模块组织。"
        />

        <div className={styles.pathGrid}>
          {learningPath.map((item, index) => (
            <Link key={item.step} to={item.to} className={styles.pathCard}>
              <div className={clsx(styles.pathStep, styles[item.color])}>{item.step}</div>
              {index < learningPath.length - 1 ? (
                <span className={styles.pathLine} aria-hidden="true" />
              ) : null}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={styles.pathLabel}>
                {item.label}
                <ArrowRight className={styles.pathArrow} />
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.moduleSectionHead}>
          <div>
            <span className={styles.moduleEyebrow}>Common Modules</span>
            <h3>通用内容模块</h3>
            <p>覆盖开发环境、ROS 2/Python 基础、YOLO 与常见问题。</p>
          </div>
          <Link to="/docs" className={styles.textLink}>
            完整文档目录
            <ArrowRight className={styles.buttonIcon} />
          </Link>
        </div>

        <div className={styles.moduleGrid}>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.title} to={module.to} className={styles.moduleCard}>
                <div className={clsx(styles.moduleIcon, styles[module.color])}>
                  <Icon />
                </div>
                <div className={styles.moduleBody}>
                  <div className={styles.moduleTitleRow}>
                    <h3>{module.title}</h3>
                    <span>{module.count} 篇</span>
                  </div>
                  <p>{module.description}</p>
                </div>
                <ArrowRight className={styles.moduleArrow} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className={styles.toolsSection}>
      <div className="container">
        <div className={styles.toolsPanel}>
          <div className={styles.toolsIntro}>
            <span className={styles.toolsEyebrow}>Toolbox</span>
            <h2>调试工具</h2>
            <p>
              集中提供底盘配置、运动标定、地图编辑与导航调试工具。工具分类、版本与
              下载资源统一维护，版本信息读取自 GitHub Releases。
            </p>
            <Link className={styles.toolsCta} to="/tools">
              查看全部工具
              <ArrowRight className={styles.buttonIcon} />
            </Link>
          </div>
          <div className={styles.toolGrid}>
            {tools.map((tool) => {
              const Icon = tool.icon === 'map' ? MapIcon : Wrench;
              const category = categoryById(tool.category);
              return (
                <Link key={tool.id} to="/tools" className={styles.toolCard}>
                  <div className={styles.toolCardTop}>
                    <span className={styles.toolIcon}>
                      <Icon />
                    </span>
                    <span className={styles.toolCategory}>{category?.label}</span>
                  </div>
                  <strong>{tool.name}</strong>
                  <p>{tool.description}</p>
                  <div className={styles.toolTags}>
                    {tool.tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
            <div className={styles.toolMore}>
              <Wrench />
              <strong>工具目录持续扩展</strong>
              <p>新增工具会登记分类、版本与下载资源。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <SectionHeading
              eyebrow="Troubleshooting"
              title="常见问题速查"
              description="汇总网络、定位、运动与 ROS 2 通信等常见问题，提供快速排查入口。"
            />
            <Link className={styles.primaryButton} to="/docs/faq/faq-overview">
              查看常见问题
              <ArrowRight className={styles.buttonIcon} />
            </Link>
          </div>
          <div className={styles.faqList}>
            {faqLinks.map((item) => (
              <Link key={item.question} to={item.to} className={styles.faqItem}>
                <span className={styles.faqTag}>{item.tag}</span>
                <span className={styles.faqQuestion}>{item.question}</span>
                <ArrowRight className={styles.faqArrow} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaBand}>
          <div className={styles.ctaBlobMint} aria-hidden="true" />
          <div className={styles.ctaBlobPeach} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <span className={styles.ctaEyebrow}>Get Started</span>
            <h2>开始使用 WS2024-Lyon Agri-AMR</h2>
            <p>从设备检查与首次上电开始，或浏览完整文档目录。</p>
            <div className={styles.ctaActions}>
              <Link
                className={styles.ctaPrimary}
                to="/amr-a/quick-start/device-check-and-boot">
                快速上手
                <ArrowRight className={styles.buttonIcon} />
              </Link>
              <Link className={styles.ctaGhost} to="/docs">
                文档总览
              </Link>
            </div>
          </div>
          <div className={styles.ctaArt} aria-hidden="true">
            <RobotPhoto className={styles.ctaPhoto} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="汇博机器人技术文档：WS2024-Lyon Agri-AMR 产品专区、WS2026 预留专区、开发环境配置、ROS 2/Python 基础、Ultralytics YOLO 与独立调试工具栏目。">
      <Hero />
      <main>
        <Products />
        <LearningAndModules />
        <ToolsSection />
        <FaqPreview />
        <CtaBand />
      </main>
    </Layout>
  );
}
