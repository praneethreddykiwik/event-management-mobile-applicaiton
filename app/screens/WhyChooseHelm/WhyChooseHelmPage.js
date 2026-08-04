import { ScrollView } from "react-native";
import styled from "styled-components/native";
import {
  StyledSemiHeading,
  StyledParagraphSmallGray,
} from "../../components/Styled/Typography.styled";
import {
  whyChooseData,
  comparisonTable,
  testimonials,
} from "../../helpers/WhyChoose.helper";
import { WHY_CHOOSE_DATA } from "../../Enums/WhyHelmText";
import { ScreenWrapper } from "../../HOC/ScreenWrapper";
const WhyChoose = () => {
  return (
    <ScreenWrapper>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StyledWrapper>
        <StyledHeroSection>
          <StyledHeroHeading>{WHY_CHOOSE_DATA.HERO_HEADING}</StyledHeroHeading>
          <StyledHeroSubHeading>
            {WHY_CHOOSE_DATA.HERO_SUBHEADING}
          </StyledHeroSubHeading>
        </StyledHeroSection>

        {whyChooseData.map((item) => (
          <StyledReasonSection>
            <StyledReasonTag>Reason {item.id}</StyledReasonTag>
            <StyledSemiHeading left>{item.title}</StyledSemiHeading>

            <StyledParagraphSmallGray left>
              {item.description}
            </StyledParagraphSmallGray>

            <StyledGrid>
              {item.eliminate && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.ELIMINATE_HEADING}
                  </StyledCardHeading>

                  {item.eliminate.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.gain && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.GAIN_HEADING}
                  </StyledCardHeading>

                  {item.gain.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.flow && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.FLOW_HEADING}
                  </StyledCardHeading>

                  {item.flow.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.focus && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.FOCUS_HEADING}
                  </StyledCardHeading>

                  {item.focus.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.handles && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.HELM_HANDLES}
                  </StyledCardHeading>

                  {item.handles.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.security && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.SECURITY_HEADING}
                  </StyledCardHeading>

                  {item.security.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.deliver && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.DELIVER_HEADING}
                  </StyledCardHeading>

                  {item.deliver.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}

              {item.clients && (
                <StyledCard>
                  <StyledCardHeading>
                    {WHY_CHOOSE_DATA.CLIENTS_HEADING}
                  </StyledCardHeading>

                  {item.clients.map((point, idx) => (
                    <StyledListItem key={idx}>{point}</StyledListItem>
                  ))}
                </StyledCard>
              )}
            </StyledGrid>

            {item.tracking && (
              <StyledInfoBox>
                <StyledParagraphSmallGray left>
                  {item.tracking}
                </StyledParagraphSmallGray>
              </StyledInfoBox>
            )}
          </StyledReasonSection>
        ))}
        {/* Comparison Table */}
        <StyledComparisonSection>
          <StyledSemiHeading>
            {WHY_CHOOSE_DATA.COMPARISON_HEADING}
          </StyledSemiHeading>

          <StyledTableWrapper>
            {comparisonTable.map((row, index) => (
              <ComparisonCard key={index}>
                <ComparisonTitle>{row.feature}</ComparisonTitle>
                <ComparisonRow>
                  <ComparisonLabel>HELM</ComparisonLabel>
                  <ComparisonValue>{row.helm}</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>Spreadsheets</ComparisonLabel>
                  <ComparisonValue>{row.spreadsheet}</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>Basic Tools</ComparisonLabel>
                  <ComparisonValue>{row.basic}</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>Enterprise</ComparisonLabel>
                  <ComparisonValue>{row.enterprise}</ComparisonValue>
                </ComparisonRow>
              </ComparisonCard>
            ))}
          </StyledTableWrapper>
        </StyledComparisonSection>
        {/* Testimonials */}
        <StyledTestimonialSection>
          <StyledSemiHeading>
            {WHY_CHOOSE_DATA.TESTIMONIAL_HEADING}
          </StyledSemiHeading>

          <StyledTestimonialGrid>
            {testimonials.map((item, index) => (
              <StyledTestimonialCard key={index}>
                <StyledReview>“{item.review}”</StyledReview>
                <StyledClientName>{item.name}</StyledClientName>
                <StyledCompany>{item.company}</StyledCompany>
              </StyledTestimonialCard>
            ))}
          </StyledTestimonialGrid>
        </StyledTestimonialSection>

        {/* CTA */}
        <StyledCTASection>
          <StyledCTAHeading>{WHY_CHOOSE_DATA.CTA_HEADING}</StyledCTAHeading>

          <StyledCTAText>{WHY_CHOOSE_DATA.CTA_TEXT}</StyledCTAText>
        </StyledCTASection>
      </StyledWrapper>
    </ScrollView>
    </ScreenWrapper>
  );
};

const StyledWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledHeroSection = styled.View`
  background-color: #1d4ed8;
  padding: 70px 20px;
  align-items: center;
  justify-content: center;
`;

const StyledHeroHeading = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

const StyledHeroSubHeading = styled.Text`
  color: #dbeafe;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  line-height: 24px;
`;

const StyledReasonSection = styled.View`
  padding: 24px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e8f0;
`;

const StyledReasonTag = styled.Text`
  color: #2563eb;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const StyledGrid = styled.View`
  margin-top: 20px;
`;

const StyledCard = styled.View`
  background-color: #f8fafc;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const StyledCardHeading = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 14px;
`;

const StyledListItem = styled.Text`
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #dbeafe;
  color: #475569;
  line-height: 22px;
`;

const StyledInfoBox = styled.View`
  background-color: #eff6ff;
  padding: 20px;
  border-left-width: 6px;
  border-left-color: #2563eb;
  border-radius: 12px;
  margin-top: 20px;
`;

const StyledComparisonSection = styled.View`
  padding: 24px 20px;
`;

const StyledTableWrapper = styled.View`
  margin-top: 20px;
`;

const ComparisonCard = styled.View`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: #e2e8f0;
`;

const ComparisonTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
`;

const ComparisonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f5f9;
`;

const ComparisonLabel = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #64748b;
`;

const ComparisonValue = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
`;

const StyledTestimonialSection = styled.View`
  background-color: #f8fafc;
  padding: 24px 20px;
`;

const StyledTestimonialGrid = styled.View`
  margin-top: 20px;
`;

const StyledTestimonialCard = styled.View`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 16px;
  elevation: 2;
`;

const StyledReview = styled.Text`
  color: #475569;
  line-height: 24px;
  font-size: 15px;
`;

const StyledClientName = styled.Text`
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
`;

const StyledCompany = styled.Text`
  margin-top: 4px;
  color: #2563eb;
  font-size: 14px;
`;

const StyledCTASection = styled.View`
  background-color: #2563eb;
  padding: 50px 20px;
  align-items: center;
`;

const StyledCTAHeading = styled.Text`
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

const StyledCTAText = styled.Text`
  color: #dbeafe;
  font-size: 16px;
  text-align: center;
  margin-top: 16px;
  line-height: 24px;
`;

export default WhyChoose;
