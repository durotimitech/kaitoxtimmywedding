'use client';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQContainer = styled(motion.section)`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FAQList = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FAQItem = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

const FAQQuestion = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.cream};
  }

  &:focus {
    outline: none;
    background: ${props => props.theme.colors.cream};
  }
`;

const QuestionText = styled.span`
  flex: 1;
  line-height: 1.4;
`;

const ChevronIcon = styled(motion.div)`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 ${props => props.theme.spacing.lg}
    ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  font-size: 1rem;
`;

const AnswerContent = styled.div`
  padding-top: ${props => props.theme.spacing.sm};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.sm};
`;

interface FAQItemData {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const faqData: FAQItemData[] = [
    {
      question: 'What is the dress code for the wedding?',
      answer:
        "The dress code is Blush Pink & Navy Blue. We'd love to see you in these colors! However, don't worry if you don't have anything in these exact shades - just dress elegantly and you'll fit right in.",
    },
    {
      question: 'Is there parking available at the venue?',
      answer: 'Yes, There is paid parking available for guests',
    },
    {
      question: 'Can I bring a plus one?',
      answer:
        "Plus ones are by invitation only due to venue capacity. Please ensure your plus one RSVP's to the wedding.",
    },
    {
      question: "What's the weather like in Ireland in September?",
      answer:
        'September weather in Ireland can be unpredictable! Pack layers and bring a light rain jacket or umbrella. Temperatures typically range from 12-18°C (54-64°F). We recommend comfortable shoes that can handle some moisture.',
    },
    {
      question: 'What currency is used in Ireland?',
      answer: 'Ireland uses the Euro (€).',
    },
    {
      question: 'Can I take photos during the ceremony?',
      answer:
        "We'd love for you to enjoy the moment with us! Our photographer will capture the official photos. Feel free to take photos during the reception and celebration.",
    },
    {
      question: 'How do I get from the airport to Limerick?',
      answer:
        'From Dublin Airport, you can take a bus (3 hours), train (2.5 hours), or rent a car (2.5 hours). Shannon Airport is much closer - only 45 minutes by car or bus. Check our Travel section for detailed information and booking links.',
    },
    {
      question: 'What if I need to cancel my RSVP?',
      answer:
        'We understand that plans can change! Please contact us as soon as possible if you need to cancel your RSVP so we can adjust our numbers with the venue.',
    },
    {
      question: 'Are children welcome at the wedding?',
      answer:
        'We love your little ones! Children are welcome at our wedding. Please let us know when you RSVP if you are bringing children so we can ensure appropriate seating and meals.',
    },
    {
      question: 'Is the wedding indoors or outdoors?',
      answer: 'The wedding ceremony is indoors.',
    },
    {
      question:
        'Is it okay to take pictures with our phones and cameras during the wedding?',
      answer:
        "Yes, please feel free to take photos during the ceremony and reception. We'd love to see your photos! There would be a QR Code to scan to upload the photos to our album.",
    },
  ];

  return (
    <FAQContainer
      id="faq"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SectionTitle>Frequently Asked Questions</SectionTitle>
      </motion.div>

      <FAQList
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{
              y: -2,
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <FAQQuestion onClick={() => toggleItem(index)}>
              <QuestionText>{item.question}</QuestionText>
              <ChevronIcon
                animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openItems.includes(index) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </ChevronIcon>
            </FAQQuestion>

            <AnimatePresence>
              {openItems.includes(index) && (
                <FAQAnswer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnswerContent>{item.answer}</AnswerContent>
                </FAQAnswer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </FAQList>
    </FAQContainer>
  );
}
