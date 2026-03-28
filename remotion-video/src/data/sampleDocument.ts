import {DocumentInput} from '../types/slides';

export const sampleDocument: DocumentInput = {
  title: 'SA Poultry Inspection System',
  subtitle: 'System Capabilities Overview',
  author: 'Singh Automation, LLC | Portage, MI 49002',
  sections: [
    {
      heading: 'Overview',
      bullets: [
        'Fully automated vision system using six industrial cameras and custom-trained AI',
        'Inspects every bird on the processing line in real time',
        'Detects surface and structural defects, assigns a quality grade',
        'Sends grade to the line PLC before the bird reaches the next station',
      ],
    },
    {
      heading: 'The Problem It Solves',
      bullets: [
        'Inconsistency — Different operators make different calls on the same defect',
        'Speed — Inspectors cannot keep up with full conveyor speed',
        'No real-time rejection — Bad units pass the diversion point before identification',
        'No records — No way to review past decisions or produce QA reports',
      ],
    },
    {
      heading: 'System Components',
      bullets: [
        '6 Industrial GigE Vision Cameras — Top, Bottom, Front, Back, Left, Right',
        'AI Detection Model — Deep learning segmentation on NVIDIA GPU, under 200ms',
        'Grading Engine — Filters duplicates, applies ruleset, produces single grade',
        'PLC Integration — EtherNet/IP signal triggers downstream diverter gate',
      ],
    },
    {
      heading: 'How It Works',
      bullets: [
        'Photoeye sensor detects bird and triggers all six cameras simultaneously',
        'AI model processes all six images in a single batch (~174ms)',
        'System deduplicates defects seen from multiple camera angles',
        'Grading engine assigns Grade A, B, or C based on defect type and count',
        'Grade sent to PLC via EtherNet/IP before bird reaches diverter station',
      ],
    },
    {
      heading: 'Defect Grading',
      bullets: [
        'Critical (Grade C) — Skin damage, large exposed flesh → immediate rejection',
        'Major (Grade B) — Broken bone, large bruise, excessive feathering, deformation',
        'Minor (Grade A) — Small bruise, wing asymmetry, missing tail, disjointed bone',
        'Two or more minor defects → Grade B; Major + Minor together → Grade C',
      ],
    },
    {
      heading: 'AI Processing Speed',
      stat: {value: '174ms', label: 'Average processing time for all six camera images'},
    },
    {
      heading: 'Detection Confidence',
      stat: {value: '87–94%', label: 'Across all defect classes during production validation'},
    },
    {
      heading: 'Data & Reporting',
      bullets: [
        'Every inspection saves all six images, defect findings, grade, unit ID, and timestamp',
        'Live dashboard shows grade counts, defect activity, and system status in real time',
        'Shift and batch reports exportable for QA teams',
        'Every Grade C rejection saved with full detection output for later review',
        'Camera failures, processing errors, and communication issues auto-logged',
      ],
    },
    {
      heading: 'Scalability',
      bullets: [
        'Extend to additional production lines with shared reporting across all of them',
        'AI model retrainable for new defect types or product varieties — no hardware changes',
        'EtherNet/IP integration configurable for other external conveyor systems',
      ],
    },
    {
      heading: 'Continuous Operation',
      stat: {value: '24/7', label: 'Designed for continuous operation with no accuracy loss'},
    },
  ],
  closingText: 'Precision Inspection at Production Speed',
};
