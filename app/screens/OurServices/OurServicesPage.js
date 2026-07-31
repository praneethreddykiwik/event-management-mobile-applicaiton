import React from "react";
import { ScrollView, View, Text } from "react-native";
import styled from "styled-components/native";

import { SERVICES_PAGE_DATA } from "../../Enums/OurServicesText";
import { servicesData } from "../../helpers/OurServices.helper";
import { ScreenWrapper } from "../../HOC/ScreenWrapper";
import PageHeader from "../../components/Headers/PageHeader/PageHeader";

const OurServices = () => {
  return (
    <ScreenWrapper>
      <PageHeader title>Our Services</PageHeader>
    <StyledWrapper showsVerticalScrollIndicator={false}>
      <StyledHeroSection>
        <StyledHeroHeading>{SERVICES_PAGE_DATA.HERO_HEADING}</StyledHeroHeading>

        <StyledHeroSubHeading>
          {SERVICES_PAGE_DATA.HERO_SUBHEADING}
        </StyledHeroSubHeading>
      </StyledHeroSection>

      {servicesData.map((service) => (
        <StyledServiceSection key={service.id}>
          <StyledTopLabel>Service {service.id}</StyledTopLabel>

          <StyledSemiHeading>{service.title}</StyledSemiHeading>

          <StyledParagraph>{service.description}</StyledParagraph>

          <StyledContentGrid>
            <StyledContentCard>
              <StyledCardTitle>
                {SERVICES_PAGE_DATA.BENEFITS_HEADING}
              </StyledCardTitle>

              {service.benefits?.map((item, idx) => (
                <StyledListItem key={idx}>• {item}</StyledListItem>
              ))}
            </StyledContentCard>

            {service.useCases && (
              <StyledContentCard>
                <StyledCardTitle>
                  {SERVICES_PAGE_DATA.USE_CASES_HEADING}
                </StyledCardTitle>

                {service.useCases.map((item, idx) => (
                  <StyledListItem key={idx}>• {item}</StyledListItem>
                ))}
              </StyledContentCard>
            )}

            {service.businessBenefits && (
              <StyledContentCard>
                <StyledCardTitle>
                  {SERVICES_PAGE_DATA.BUSINESS_BENEFITS}
                </StyledCardTitle>

                {service.businessBenefits.map((item, idx) => (
                  <StyledListItem key={idx}>• {item}</StyledListItem>
                ))}
              </StyledContentCard>
            )}
          </StyledContentGrid>

          {service.example && (
            <StyledExampleBox>
              <StyledExampleHeading>
                {SERVICES_PAGE_DATA.REAL_WORLD_EXAMPLE}
              </StyledExampleHeading>

              <StyledParagraph>{service.example}</StyledParagraph>
            </StyledExampleBox>
          )}

          {service.phases && (
            <StyledLifecycleGrid>
              <StyledLifecycleCard>
                <StyledCardTitle>
                  {SERVICES_PAGE_DATA.PRE_EVENT}
                </StyledCardTitle>

                {service.phases.preEvent.map((item, idx) => (
                  <StyledListItem key={idx}>• {item}</StyledListItem>
                ))}
              </StyledLifecycleCard>

              <StyledLifecycleCard>
                <StyledCardTitle>
                  {SERVICES_PAGE_DATA.EVENT_DAY}
                </StyledCardTitle>

                {service.phases.eventDay.map((item, idx) => (
                  <StyledListItem key={idx}>• {item}</StyledListItem>
                ))}
              </StyledLifecycleCard>

              <StyledLifecycleCard>
                <StyledCardTitle>
                  {SERVICES_PAGE_DATA.POST_EVENT}
                </StyledCardTitle>

                {service.phases.postEvent.map((item, idx) => (
                  <StyledListItem key={idx}>• {item}</StyledListItem>
                ))}
              </StyledLifecycleCard>
            </StyledLifecycleGrid>
          )}
        </StyledServiceSection>
      ))}
    </StyledWrapper>
    </ScreenWrapper>
  );
};

export default OurServices;

const StyledWrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const StyledHeroSection = styled.View`
   background-color: #1e3a8a;
  padding: 80px 20px;
  align-items: center;
`;

const StyledHeroHeading = styled.Text`
  color: white;
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  line-height: 44px;
`;

const StyledHeroSubHeading = styled.Text`
  color: #dbeafe;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  line-height: 26px;
`;

const StyledServiceSection = styled.View`
  padding: 30px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e8f0;
`;

const StyledTopLabel = styled.Text`
  color: #2563eb;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const StyledSemiHeading = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #111827;
`;

const StyledParagraph = styled.Text`
  color: #6b7280;
  margin-top: 15px;
  font-size: 15px;
  line-height: 24px;
`;

const StyledContentGrid = styled.View`
  margin-top: 30px;
`;

const StyledContentCard = styled.View`
  background-color: #f8fafc;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 20px;
`;

const StyledCardTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 18px;
  text-align: center;
`;

const StyledListItem = styled.Text`
  font-size: 15px;
  color: #374151;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #dbeafe;
  line-height: 22px;
`;

const StyledExampleBox = styled.View`
  background-color: #eff6ff;
  padding: 24px;
  margin-top: 25px;
  border-left-width: 5px;
  border-left-color: #2563eb;
  border-radius: 12px;
`;

const StyledExampleHeading = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #111827;
`;

const StyledLifecycleGrid = styled.View`
  margin-top: 30px;
`;

const StyledLifecycleCard = styled.View`
  background-color: #f8fafc;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 20px;
`;
