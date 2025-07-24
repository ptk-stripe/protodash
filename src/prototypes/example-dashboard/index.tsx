import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSailUI } from '@/contexts/SailUIContext';
// import { Spinner } from '@sail/ui';
// import { Spinner } from '../../../mocks/sail-ui';
import { SailDialog } from '@/components/sail-emulated/sail-dialog';

export default function ExampleDashboard() {
  const router = useRouter();
  const { sailComponents, isLoaded } = useSailUI();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Loading state - DO NOT MODIFY this spinner logic
  if (!isLoaded || !sailComponents) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        padding: '2rem'
      }}>
        {/* <Spinner size="medium" /> */}
        <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 w-6 h-6"></div>
      </div>
    );
  }

  // Extract the components from sailComponents
  const { Page, PageHeader, PageSection, PageModule, Breadcrumbs, Link, Button, Badge, Banner, InlineFeedback, createView } = sailComponents;

  const navigateToSubpage = (subpage: string) => {
    router.push(`/prototype/example-dashboard/${subpage}`);
  };

  // Custom styled components using createView
  const BadgeGroup = createView('div', {
    css: {
      stack: 'x',
      gap: 'medium',
      wrap: 'wrap',
    },
  });

  const ButtonGroup = createView('div', {
    css: {
      stack: 'x',
      gap: 'medium',
    },
  });

  const Stack = createView('div', {
    css: {
      stack: 'y',
      gap: 'large',
    },
  });

  return (
    <Page
      header={
        <PageHeader
          title="Hello World"
          description="This demonstrates how to build interactive, multi-page prototypes—with Sail support"
          breadcrumbs={
            <Breadcrumbs>
              <Link href="/dashboard">Home</Link>
              <Link href="/prototype/example-dashboard">Example Dashboard</Link>
            </Breadcrumbs>
          }
        />
      }
    >
      <PageSection layout="single">
        <Stack>
          <Banner 
            type="caution"
            title="🚀 Start prototyping in Cursor!"
            description="Jump into Cursor and ask the agent to start building your prototype by describing the page you want to build. It'll magically appear in the left nav!"
          />

          <PageModule title="Sail Components" hideHeaderDivider>
            <Stack>
              <BadgeGroup>
                <Badge>Default</Badge>
                <Badge type="info">Info</Badge>
                <Badge type="positive">Success</Badge>
                <Badge type="warning">Warning</Badge>
                <Badge type="negative">Error</Badge>
              </BadgeGroup>

              <ButtonGroup>
                <Button type="primary">Primary Button</Button>
                <Button type="secondary">Secondary Button</Button>
                <Button type="destructive">Destructive Button</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button onClick={() => setDialogOpen(true)}>
                  Open Sail Dialog
                </Button>
              </ButtonGroup>

              <InlineFeedback>
                Hey look, we can do inline feedback too! This isn't a comprehensive set of examples, just a demo.
              </InlineFeedback>
            </Stack>
          </PageModule>

          <PageModule title="Child Pages" hideHeaderDivider>
            <Stack>
              <div>
                These pages are part of this prototype but don't appear in the sidebar navigation. Prototype settings are accessible via the top-right cog icon.
              </div>
              
              <ButtonGroup>
                <Button 
                  type="secondary"
                  onClick={() => navigateToSubpage('user-details')}
                >
                  View User Details →
                </Button>

              </ButtonGroup>
            </Stack>
          </PageModule>
        </Stack>
      </PageSection>

      {/* Sail Dialog Example */}
      <SailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Sail Dialog Example"
        footer={
          <Button onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        }
      >
        <p>This is an example of the Sail Dialog component.</p>
        <p>In this case, this is an emulation of the Sail Dialog component, which is not compatible with this project directly.</p>
      </SailDialog>
    </Page>
  );
} 