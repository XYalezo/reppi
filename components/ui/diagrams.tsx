import { DiagramArrow, DiagramFrame, DiagramLabel, DiagramNode } from './diagram';

export function AssistantScopeDiagram() {
  return (
    <DiagramFrame
      title="A scoped AI assistant between users and company data"
      description="Users ask the assistant. The access scope decides what the assistant may read from the data sources. Questions it may not answer are handed to a person."
      width={400}
      height={464}
    >
      <DiagramNode x={0} y={0} width={248} height={64} lines={['Users', 'Ask questions']} />
      <DiagramArrow from={[124, 64]} to={[124, 112]} />
      <DiagramNode x={0} y={112} width={248} height={88} lines={['Assistant', 'Answers only what', 'it may answer']} variant="solid" />
      <DiagramArrow from={[248, 156]} to={[272, 156]} />
      <DiagramNode x={272} y={112} width={128} height={88} lines={['Handover', 'to a person']} variant="dashed" />
      <DiagramArrow from={[124, 200]} to={[124, 248]} />
      <DiagramNode x={0} y={248} width={248} height={88} lines={['Access scope', 'Who can ask what']} />
      <DiagramArrow from={[124, 336]} to={[124, 376]} />
      <DiagramNode x={0} y={376} width={248} height={88} lines={['Data sources', 'Chosen with the company']} />
    </DiagramFrame>
  );
}

export function PlatformDiagram() {
  return (
    <DiagramFrame
      title="One platform with separate data for each municipality"
      description="Residents use Aliwal Pulse on their phones. It runs on Supabase and PostgreSQL, which keep each municipality's data separate. Walter Sisulu Local Municipality uses it now, and other municipalities can be configured without rebuilding it."
      width={400}
      height={400}
    >
      <DiagramNode x={0} y={0} width={400} height={64} lines={['Residents', 'Use it on their phones']} />
      <DiagramArrow from={[200, 64]} to={[200, 104]} />
      <DiagramNode x={0} y={104} width={400} height={64} lines={['Aliwal Pulse', 'Installs like an app']} variant="solid" />
      <DiagramArrow from={[200, 168]} to={[200, 208]} />
      <DiagramNode x={0} y={208} width={400} height={64} lines={['Supabase and PostgreSQL', 'Each municipality’s data kept separate']} />
      <DiagramArrow from={[96, 272]} to={[96, 312]} />
      <DiagramArrow from={[304, 272]} to={[304, 312]} />
      <DiagramNode x={0} y={312} width={192} height={88} lines={['Walter Sisulu', 'Local Municipality', 'Live and in use']} variant="solid" />
      <DiagramNode x={208} y={312} width={192} height={88} lines={['Other municipalities', 'Configured, not rebuilt']} variant="dashed" />
    </DiagramFrame>
  );
}

export function MigrationPathDiagram() {
  return (
    <DiagramFrame
      title="A generic cloud migration path"
      description="Five stages from the current setup: review what runs today, order the moves, check each part as it moves, then run in the cloud."
      width={320}
      height={464}
    >
      <DiagramNode x={0} y={0} width={220} height={48} lines={['Current setup']} />
      <DiagramLabel x={236} y={29}>Today</DiagramLabel>
      <DiagramArrow from={[110, 48]} to={[110, 88]} />
      <DiagramNode x={0} y={88} width={220} height={64} lines={['Review', 'List what runs today']} />
      <DiagramArrow from={[110, 152]} to={[110, 192]} />
      <DiagramNode x={0} y={192} width={220} height={64} lines={['Plan', 'Order the moves']} />
      <DiagramArrow from={[110, 256]} to={[110, 296]} />
      <DiagramNode x={0} y={296} width={220} height={64} lines={['Move', 'Check each part']} />
      <DiagramArrow from={[110, 360]} to={[110, 400]} />
      <DiagramNode x={0} y={400} width={220} height={64} lines={['Cloud', 'Running in its new home']} variant="solid" />
      <DiagramLabel x={236} y={437}>Done</DiagramLabel>
    </DiagramFrame>
  );
}
