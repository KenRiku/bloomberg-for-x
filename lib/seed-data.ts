export const FOCUS_AREAS = [
  { slug: 'glp1-agonists', label: 'GLP-1 Agonists', category: 'pharmacology' },
  { slug: 'crispr-therapeutics', label: 'CRISPR Therapeutics', category: 'genomics' },
  { slug: 'mrna-vaccines', label: 'mRNA Vaccines', category: 'immunology' },
  { slug: 'solid-state-batteries', label: 'Solid-State Batteries', category: 'materials' },
  { slug: 'quantum-computing', label: 'Quantum Computing', category: 'physics' },
  { slug: 'alzheimers', label: "Alzheimer's Disease", category: 'neurology' },
  { slug: 'cancer-immunotherapy', label: 'Cancer Immunotherapy', category: 'oncology' },
  { slug: 'protein-folding', label: 'Protein Folding', category: 'structural-biology' },
  { slug: 'gene-therapy', label: 'Gene Therapy', category: 'genomics' },
  { slug: 'microbiome', label: 'Gut Microbiome', category: 'microbiology' },
  { slug: 'nuclear-fusion', label: 'Nuclear Fusion', category: 'physics' },
  { slug: 'large-language-models', label: 'Large Language Models', category: 'ai' },
  { slug: 'climate-science', label: 'Climate Science', category: 'earth-science' },
  { slug: 'neuroscience', label: 'Cognitive Neuroscience', category: 'neurology' },
  { slug: 'synthetic-biology', label: 'Synthetic Biology', category: 'biology' },
  { slug: 'drug-delivery', label: 'Nanoparticle Drug Delivery', category: 'pharmacology' },
  { slug: 'longevity', label: 'Longevity & Aging', category: 'biology' },
  { slug: 'antibiotic-resistance', label: 'Antibiotic Resistance', category: 'microbiology' },
  { slug: 'neuromorphic-computing', label: 'Neuromorphic Computing', category: 'ai' },
  { slug: 'epigenetics', label: 'Epigenetics', category: 'genomics' },
]

export const SEED_PAPERS = [
  {
    externalId: 'seed-001',
    source: 'pubmed',
    title: 'Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes',
    authors: ['Frías JP', 'Davies MJ', 'Rosenstock J', 'Pérez Manghi FC'],
    abstract:
      'In this head-to-head trial, we compared tirzepatide, a dual GIP and GLP-1 receptor agonist, with semaglutide, a selective GLP-1 receptor agonist, in patients with type 2 diabetes inadequately controlled with metformin. Tirzepatide at all doses produced superior HbA1c reductions versus semaglutide. Body weight reductions were also significantly greater with tirzepatide. The safety profiles were similar, with gastrointestinal events being the most common adverse effects.',
    journal: 'New England Journal of Medicine',
    publishedDate: new Date('2024-06-15'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-001',
    aiSummary:
      'Tirzepatide outperforms semaglutide for blood sugar control and weight loss in type 2 diabetes patients. As a dual-action drug targeting both GIP and GLP-1 receptors, it produces 1.5-2x greater HbA1c reductions, suggesting that targeting multiple metabolic pathways yields superior outcomes compared to GLP-1 receptor agonism alone.',
    category: 'pharmacology',
    tags: ['glp1-agonists'],
  },
  {
    externalId: 'seed-002',
    source: 'pubmed',
    title: 'CRISPR-Cas9 Base Editing for Sickle Cell Disease: Long-term Safety and Efficacy',
    authors: ['Frangoul H', 'Altshuler D', 'Cappellini MD', 'Chen YS'],
    abstract:
      'We report 24-month follow-up data from patients with sickle cell disease treated with exagamglogene autotemcel (exa-cel), a CRISPR-Cas9 gene-edited cell therapy. All patients achieved transfusion independence. Fetal hemoglobin levels remained elevated, comprising 40-60% of total hemoglobin. No off-target editing was detected in long-term follow-up, and no cases of malignancy or graft failure were observed.',
    journal: 'Nature Medicine',
    publishedDate: new Date('2024-07-22'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-002',
    aiSummary:
      'CRISPR-based gene editing for sickle cell disease shows durable results at 2 years: patients achieve transfusion independence and maintain high fetal hemoglobin levels with no safety concerns. This represents a potential functional cure for a disease affecting 100,000+ Americans.',
    category: 'genomics',
    tags: ['crispr-therapeutics', 'gene-therapy'],
  },
  {
    externalId: 'seed-003',
    source: 'arxiv',
    title: 'Solid-State Electrolytes with Room-Temperature Conductivity Exceeding Liquid Electrolytes',
    authors: ['Zhang Y', 'Janek J', 'Adelhelm P'],
    abstract:
      'We report the synthesis of a novel argyrodite-based solid electrolyte with ionic conductivity of 32 mS/cm at 25°C, exceeding conventional liquid electrolytes. The material demonstrates electrochemical stability windows up to 5V versus Li/Li+ and compatibility with lithium metal anodes. Full cells assembled with this electrolyte show 500 cycles with <10% capacity fade, representing a breakthrough for practical solid-state batteries.',
    journal: 'Nature Energy',
    publishedDate: new Date('2024-08-01'),
    url: 'https://arxiv.org/abs/example-003',
    aiSummary:
      'A new solid-state battery electrolyte matches and exceeds liquid electrolyte conductivity at room temperature — long the key barrier to commercialization. With 500-cycle stability and lithium metal compatibility, this material could unlock EVs with 500+ mile range and decade-long lifespans.',
    category: 'materials',
    tags: ['solid-state-batteries'],
  },
  {
    externalId: 'seed-004',
    source: 'arxiv',
    title: 'Fault-Tolerant Quantum Computing with 1000+ Physical Qubits: First Logical Error Rate Below Surface Code Threshold',
    authors: ['Google Quantum AI', 'Acharya R', 'Aleiner I'],
    abstract:
      'We demonstrate fault-tolerant quantum error correction achieving logical error rates below 10^-6 per cycle using 1,056 physical qubits arranged in a distance-7 surface code. This represents the first experimental demonstration of logical error rates competitive with classical computing for critical applications. We show exponential error suppression with code distance, confirming theoretical predictions and validating the path to utility-scale quantum computing.',
    journal: 'Nature',
    publishedDate: new Date('2024-08-10'),
    url: 'https://arxiv.org/abs/example-004',
    aiSummary:
      'Google achieves a quantum computing milestone: logical error rates below 10^-6 using 1,056 qubits in error-corrected configuration. This validates the theoretical framework for scaling to practical quantum advantage and suggests utility-scale quantum computers are achievable within the decade.',
    category: 'physics',
    tags: ['quantum-computing'],
  },
  {
    externalId: 'seed-005',
    source: 'pubmed',
    title: 'mRNA-1283 Next-Generation COVID-19 Vaccine: Superior Immunogenicity and Mucosal Response',
    authors: ['Baden LR', 'El Sahly HM', 'Essink B', 'Kotloff K'],
    abstract:
      'mRNA-1283, a next-generation COVID-19 vaccine encoding the receptor-binding domain and N-terminal domain of the SARS-CoV-2 spike protein, demonstrated 26-fold higher neutralizing antibody titers compared to mRNA-1273 at matched doses. Phase 3 data showed 92.7% efficacy against symptomatic COVID-19 and notably, 78% reduction in transmission events, suggesting mucosal immunity induction not seen with first-generation vaccines.',
    journal: 'NEJM',
    publishedDate: new Date('2024-07-30'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-005',
    aiSummary:
      "Moderna's next-gen COVID vaccine (mRNA-1283) achieves 26x higher antibody titers and crucially shows mucosal immunity — potentially reducing transmission by 78%. This may signal that mRNA platform optimization can address limitations of first-generation COVID vaccines and could accelerate development of respiratory virus vaccines broadly.",
    category: 'immunology',
    tags: ['mrna-vaccines'],
  },
  {
    externalId: 'seed-006',
    source: 'pubmed',
    title: "Lecanemab Two-Year Follow-up: Slowing Alzheimer's Progression and Biomarker Clearance",
    authors: ['van Dyck CH', 'Swanson CJ', 'Aisen P', 'Bateman RJ'],
    abstract:
      'Two-year follow-up of the CLARITY AD trial shows lecanemab treatment results in 35% slowing of clinical decline on the CDR-SB scale versus placebo. Complete amyloid clearance, defined as below centiloid threshold, was achieved in 81% of participants. Tau PET imaging showed significant reduction in tau accumulation in treatment-exposed cortical regions, suggesting disease modification beyond amyloid removal.',
    journal: 'NEJM',
    publishedDate: new Date('2024-08-05'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-006',
    aiSummary:
      "Lecanemab shows durable Alzheimer's disease modification at 2 years: 35% slowing of cognitive decline with amyloid clearance in 81% of patients and — crucially — downstream tau reduction. This is the strongest evidence yet for the amyloid cascade hypothesis and validates anti-amyloid therapy as a disease-modifying approach.",
    category: 'neurology',
    tags: ['alzheimers', 'neuroscience'],
  },
  {
    externalId: 'seed-007',
    source: 'pubmed',
    title: 'CAR-T Cell Therapy for Solid Tumors: Breakthrough Using Armored CAR Construct',
    authors: ['June CH', 'Sadelain M', 'Levine BL'],
    abstract:
      'We report first-in-human results of a novel "armored" CAR-T cell construct targeting mesothelin in solid tumors. The construct co-expresses IL-15 and a dominant-negative TGF-β receptor to overcome the immunosuppressive tumor microenvironment. Of 28 evaluable patients with mesothelioma, 11 (39%) achieved objective responses, including 3 complete responses. Median progression-free survival was 8.4 months, compared to historical 3-5 months for standard therapy.',
    journal: 'Cancer Cell',
    publishedDate: new Date('2024-07-15'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-007',
    aiSummary:
      'Armored CAR-T cells — engineered to resist tumor immune suppression — achieve 39% response rate in solid tumors where CAR-T has historically failed. This could unlock CAR-T therapy for the 90% of cancers that are solid tumors, a market 10x larger than the liquid malignancies where CAR-T currently succeeds.',
    category: 'oncology',
    tags: ['cancer-immunotherapy'],
  },
  {
    externalId: 'seed-008',
    source: 'arxiv',
    title: 'AlphaFold3 Predicts Protein-Drug Interactions with Experimental Accuracy',
    authors: ['Abramson J', 'Adler J', 'Dunger J', 'Evans R'],
    abstract:
      'AlphaFold3, an extended architecture incorporating diffusion-based structure prediction for small molecules, nucleic acids, and modified residues, achieves median RMSD of 0.8Å for protein-ligand complexes — matching experimental crystallography accuracy for 67% of test cases. The model enables virtual screening at scale, correctly ranking approved drugs versus decoys with 94% AUC across 1,200 target-ligand pairs.',
    journal: 'Nature',
    publishedDate: new Date('2024-08-12'),
    url: 'https://arxiv.org/abs/example-008',
    aiSummary:
      'AlphaFold3 now predicts how drugs bind proteins with crystallography-level accuracy. This could reduce the cost of drug discovery by 50-80% by enabling accurate virtual screening before expensive wet lab work, potentially compressing early-stage discovery timelines from 5 years to 18 months.',
    category: 'structural-biology',
    tags: ['protein-folding', 'drug-delivery'],
  },
  {
    externalId: 'seed-009',
    source: 'pubmed',
    title: 'Gut Microbiome Signature Predicts PD-1 Immunotherapy Response with 82% Accuracy',
    authors: ['Routy B', 'Le Chatelier E', 'Derosa L'],
    abstract:
      'Analysis of fecal microbiome from 1,847 patients across 12 cancer types receiving PD-1 checkpoint inhibitors revealed a 23-species microbiome signature that predicts immunotherapy response with 82% accuracy (AUC 0.91). Akkermansia muciniphila abundance correlated most strongly with response. Fecal microbiome transplant from responders to germ-free mice conferred enhanced anti-tumor immunity, establishing causality.',
    journal: 'Science',
    publishedDate: new Date('2024-07-28'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-009',
    aiSummary:
      'A gut microbiome signature predicts cancer immunotherapy response with 82% accuracy across 12 cancer types — and FMT experiments prove causality. This opens a path to microbiome modulation as an immunotherapy augmentation strategy, potentially improving response rates from ~30% to 50%+ through pre-treatment microbiome optimization.',
    category: 'microbiology',
    tags: ['microbiome', 'cancer-immunotherapy'],
  },
  {
    externalId: 'seed-010',
    source: 'arxiv',
    title: 'Net Energy Gain Demonstrated in Inertial Confinement Fusion at NIF',
    authors: ['Hurricane OA', 'Patel PK', 'Betti R'],
    abstract:
      'We report reproducible demonstration of fusion ignition with energy gain (Q > 1) at the National Ignition Facility. Laser energy input of 2.05 MJ produced 3.88 MJ of fusion energy (Q = 1.89), with peak fuel temperature of 150 million degrees Celsius and areal density exceeding 1.5 g/cm². Five consecutive shots across three ignition campaigns demonstrated reproducibility. Tritium breeding experiments in lithium blankets showed breeding ratios of 1.12, validating the fuel cycle for future reactors.',
    journal: 'Physical Review Letters',
    publishedDate: new Date('2024-08-08'),
    url: 'https://arxiv.org/abs/example-010',
    aiSummary:
      'Nuclear fusion energy gain (Q=1.89) is now reproducible across 5 consecutive experiments. Tritium breeding ratios above 1.0 validate the complete fuel cycle. This represents a phase transition from scientific curiosity to engineering challenge — commercial fusion power is now a question of when, not if.',
    category: 'physics',
    tags: ['nuclear-fusion'],
  },
  {
    externalId: 'seed-011',
    source: 'arxiv',
    title: 'Constitutional AI Achieves Human-Level Performance on Medical Licensing Exams',
    authors: ['Anil R', 'Borgeaud S', 'Chowdhery A'],
    abstract:
      'We present a constitutional AI model achieving 89.4% on USMLE Step 1-3 exams (human passing threshold: 60%), 94.2% on the Medical Council of Canada evaluating examination, and 91.7% on European medical board examinations. The model demonstrates calibrated uncertainty estimation, citing relevant literature and flagging cases requiring specialist consultation, outperforming average physician performance on differential diagnosis tasks.',
    journal: 'arXiv',
    publishedDate: new Date('2024-08-14'),
    url: 'https://arxiv.org/abs/example-011',
    aiSummary:
      'AI models now pass medical licensing exams at near-expert physician levels (89-94%) with calibrated uncertainty and appropriate specialist escalation. This changes the calculus on AI-assisted diagnosis deployment and suggests frontier AI could function as a first-pass diagnostic tool in primary care within 2-3 years.',
    category: 'ai',
    tags: ['large-language-models'],
  },
  {
    externalId: 'seed-012',
    source: 'pubmed',
    title: 'Rapamycin Extends Mouse Lifespan by 25% When Started at Mid-Life',
    authors: ['Harrison DE', 'Strong R', 'Sharp ZD', 'Nelson JF'],
    abstract:
      'Rapamycin administered to 20-month-old mice (equivalent to ~60 years human age) extended median lifespan by 25% in males and 28% in females. Mechanistic analysis revealed mTORC1 inhibition restored autophagic flux, reduced senescent cell burden by 60%, and maintained mitochondrial function comparable to 12-month-old mice. Cognitive function assessed by Morris water maze remained intact in treated animals at 30 months.',
    journal: 'Nature Aging',
    publishedDate: new Date('2024-07-20'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-012',
    aiSummary:
      'Rapamycin extends mouse lifespan by 25-28% even when started at mid-life equivalent to human age 60, while preserving cognitive function. The mechanism — mTOR inhibition reducing senescent cells by 60% — is directly translatable to human biology. Multiple rapamycin analogs are now in human longevity trials.',
    category: 'biology',
    tags: ['longevity', 'epigenetics'],
  },
  {
    externalId: 'seed-013',
    source: 'pubmed',
    title: 'Phage Therapy Resolves Multidrug-Resistant Bacterial Infection Unresponsive to All Antibiotics',
    authors: ['Schooley RT', 'Biswas B', 'Gill JJ'],
    abstract:
      'We report 47 cases of bacteriophage therapy for multidrug-resistant infections in patients who had failed all available antibiotic therapies. Clinical success (infection resolution or significant improvement) was achieved in 34/47 patients (72%). Bacteriophage-antibiotic synergy was observed in 89% of in vitro susceptibility testing, with phage sensitizing resistant bacteria to previously ineffective antibiotics. No serious adverse events were attributed to phage therapy.',
    journal: 'JAMA',
    publishedDate: new Date('2024-08-03'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-013',
    aiSummary:
      'Phage therapy resolves 72% of last-resort antibiotic-resistant infections in a 47-patient case series, while re-sensitizing bacteria to failed antibiotics in 89% of cases. This validates phage therapy as a viable strategy against the antibiotic resistance crisis, with 2.8 million drug-resistant infections per year in the US.',
    category: 'microbiology',
    tags: ['antibiotic-resistance', 'microbiome'],
  },
  {
    externalId: 'seed-014',
    source: 'arxiv',
    title: "LNP-mRNA Delivery to Brain Achieves Therapeutic Gene Editing in Parkinson's Disease Model",
    authors: ['Rosenblum D', 'Joshi N', 'Tao W'],
    abstract:
      "Brain-penetrating lipid nanoparticles (LNPs) loaded with LRRK2-targeting siRNA achieved 87% gene silencing in substantia nigra dopaminergic neurons following intravenous administration in non-human primates. LRRK2 knockdown reduced alpha-synuclein aggregation by 74% and preserved 91% of dopaminergic neurons in an MPTP Parkinson's model. Therapeutic concentrations were achieved in brain with <5% liver accumulation, representing a 20-fold improvement in brain-liver selectivity.",
    journal: 'Nature Biotechnology',
    publishedDate: new Date('2024-08-06'),
    url: 'https://arxiv.org/abs/example-014',
    aiSummary:
      "Brain-targeting LNPs achieve 87% gene silencing in Parkinson's-relevant neurons via IV injection in primates — with 20x better brain vs. liver selectivity than prior LNPs. This platform could unlock mRNA/RNAi therapies for neurodegenerative diseases, a market currently limited by CNS drug delivery barriers.",
    category: 'pharmacology',
    tags: ['drug-delivery', 'mrna-vaccines', 'neuroscience'],
  },
  {
    externalId: 'seed-015',
    source: 'pubmed',
    title: 'Whole-Genome Sequencing of 500,000 UK Biobank Participants Identifies 12,000 Novel Disease Loci',
    authors: ['Bycroft C', 'Freeman C', 'Petkova D', 'Band G'],
    abstract:
      'Analysis of whole-genome sequencing data from 500,000 UK Biobank participants across 789 phenotypes identified 12,248 novel genetic associations, including 847 rare variant associations not detectable by standard GWAS arrays. Polygenic scores derived from this analysis improve cardiovascular disease prediction by 34% and type 2 diabetes prediction by 41% over existing clinical risk models. Cross-ancestry analysis identifies 1,847 associations replicating across all ancestral groups.',
    journal: 'Science',
    publishedDate: new Date('2024-08-09'),
    url: 'https://pubmed.ncbi.nlm.nih.gov/example-015',
    aiSummary:
      'UK Biobank WGS of 500,000 people discovers 12,000+ new disease genes, improving cardiovascular and diabetes risk prediction by 34-41%. This genetic atlas will power the next decade of precision medicine, enabling pre-symptomatic identification of individuals who would benefit most from preventive interventions.',
    category: 'genomics',
    tags: ['epigenetics', 'longevity'],
  },
]
