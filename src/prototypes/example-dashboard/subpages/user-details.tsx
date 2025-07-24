import React from 'react';
import { useRouter } from 'next/navigation';
import { useSailUI } from '@/contexts/SailUIContext';
// import { Spinner } from '@sail/ui';
// import { Spinner } from '../../../../mocks/sail-ui';

export default function UserDetails() {
  const router = useRouter();
  const { sailComponents, isLoaded } = useSailUI();

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
  const { Page, PageHeader, PageSection, PageModule, Breadcrumbs, Link, Button, Badge, Banner, PropertyList, PropertyListItem, createView } = sailComponents;

  // Custom styled components using createView
  const ButtonGroup = createView('div', {
    css: {
      stack: 'x',
      gap: 'medium',
    },
  });

  return (
    <Page
      header={
        <PageHeader
          title="User Details"
          description="This is a child page that doesn't appear in the sidebar navigation."
          breadcrumbs={
            <Breadcrumbs>
              <Link href="/dashboard">Home</Link>
              <Link href="/prototype/example-dashboard">Example Dashboard</Link>
              <Link href="/prototype/example-dashboard/user-details">User Details</Link>
            </Breadcrumbs>
          }
        />
      }
    >
      <PageSection layout="single">
        <PageModule title="User Profile" hideHeaderDivider>
          <PropertyList>
            <PropertyListItem label="Name" value="John Doe" />
            <PropertyListItem label="Email" value="john@example.com" />
            <PropertyListItem label="Status" value={<Badge type="positive">Active</Badge>} />
          </PropertyList>
        </PageModule>
      </PageSection>

      <PageSection layout="single">
        <Banner 
          type="default"
          description="This is just a static example of a child page. Child pages like this are perfect for detailed views, settings panels, or multi-step flows that don't need to clutter the main navigation."
        />
      </PageSection>

      <PageSection layout="single">
        <ButtonGroup>
          <Button 
            type="secondary"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
          <Button type="primary">
            Edit User
          </Button>
        </ButtonGroup>
      </PageSection>
    </Page>
  );
} 