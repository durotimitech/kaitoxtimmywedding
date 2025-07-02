'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';

const BankContainer = styled(motion.section)`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CurrencyGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CurrencyCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const CurrencyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const CurrencyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
`;

const CurrencyTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const BankDetail = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const DetailText = styled.span`
  flex: 1;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  font-family: monospace;
`;

const CopyButton = styled.button<{ $copied?: boolean }>`
  background: ${props =>
    props.$copied ? props.theme.colors.success : props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface BankAccount {
  currency: string;
  currencyCode: string;
  accountName: string;
  accountNumber?: string;
  iban?: string;
  swift?: string;
  routingNumber?: string;
  bankName: string;
}

const bankAccounts: BankAccount[] = [
  {
    currency: 'Euro',
    currencyCode: 'EUR',
    accountName: 'Oluwadurotimi Mejabi',
    iban: 'IE82 REVO 9903 6075 6982 54',
    swift: 'REVOIE23',
    bankName: 'Revolut Bank UAB',
  },
  {
    currency: 'Nigerian Naira',
    currencyCode: 'NGN',
    accountName: 'Oluwadurotimi Mejabi',
    accountNumber: '0249564539',
    bankName: 'Guaranty Trust Bank',
  },
  {
    currency: 'US Dollar',
    currencyCode: 'USD',
    accountName: 'Oluwadurotimi Mejabi',
    iban: 'IE82 REVO 9903 6075 6982 54',
    swift: 'REVOIE23',
    bankName: 'Revolut Bank UAB',
  },
];

export function BankDetailsSection() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <BankContainer
      id="gifts"
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
        <SectionTitle>Gifts & Registry</SectionTitle>
        <SectionSubtitle>
          Your presence at our wedding is the greatest gift of all. However, if
          you wish to honor us with a monetary gift, you can do so below!
        </SectionSubtitle>
      </motion.div>

      <CurrencyGrid
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {bankAccounts.map((account, index) => (
          <CurrencyCard
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.6 + index * 0.2,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
            >
              <CurrencyHeader>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <CurrencyIcon>{account.currencyCode}</CurrencyIcon>
                </motion.div>
                <CurrencyTitle>{account.currency}</CurrencyTitle>
              </CurrencyHeader>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.2 }}
            >
              <BankDetail>
                <DetailLabel>Account Name</DetailLabel>
                <DetailValue>
                  <DetailText>{account.accountName}</DetailText>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{
                      background:
                        copiedItem === `${index}-name` ? '#10b981' : '#D4AF37',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                    }}
                    onClick={() =>
                      copyToClipboard(account.accountName, `${index}-name`)
                    }
                  >
                    {copiedItem === `${index}-name` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedItem === `${index}-name` ? 'Copied' : 'Copy'}
                  </motion.button>
                </DetailValue>
              </BankDetail>
            </motion.div>

            {account.accountNumber && (
              <BankDetail>
                <DetailLabel>Account Number</DetailLabel>
                <DetailValue>
                  <DetailText>{account.accountNumber}</DetailText>
                  <CopyButton
                    $copied={copiedItem === `${index}-account`}
                    onClick={() =>
                      copyToClipboard(
                        account.accountNumber!,
                        `${index}-account`
                      )
                    }
                  >
                    {copiedItem === `${index}-account` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedItem === `${index}-account` ? 'Copied' : 'Copy'}
                  </CopyButton>
                </DetailValue>
              </BankDetail>
            )}

            {account.iban && (
              <BankDetail>
                <DetailLabel>IBAN</DetailLabel>
                <DetailValue>
                  <DetailText>{account.iban}</DetailText>
                  <CopyButton
                    $copied={copiedItem === `${index}-iban`}
                    onClick={() =>
                      copyToClipboard(account.iban!, `${index}-iban`)
                    }
                  >
                    {copiedItem === `${index}-iban` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedItem === `${index}-iban` ? 'Copied' : 'Copy'}
                  </CopyButton>
                </DetailValue>
              </BankDetail>
            )}

            {account.swift && (
              <BankDetail>
                <DetailLabel>SWIFT/BIC</DetailLabel>
                <DetailValue>
                  <DetailText>{account.swift}</DetailText>
                  <CopyButton
                    $copied={copiedItem === `${index}-swift`}
                    onClick={() =>
                      copyToClipboard(account.swift!, `${index}-swift`)
                    }
                  >
                    {copiedItem === `${index}-swift` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedItem === `${index}-swift` ? 'Copied' : 'Copy'}
                  </CopyButton>
                </DetailValue>
              </BankDetail>
            )}

            {account.routingNumber && (
              <BankDetail>
                <DetailLabel>Routing Number</DetailLabel>
                <DetailValue>
                  <DetailText>{account.routingNumber}</DetailText>
                  <CopyButton
                    $copied={copiedItem === `${index}-routing`}
                    onClick={() =>
                      copyToClipboard(
                        account.routingNumber!,
                        `${index}-routing`
                      )
                    }
                  >
                    {copiedItem === `${index}-routing` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedItem === `${index}-routing` ? 'Copied' : 'Copy'}
                  </CopyButton>
                </DetailValue>
              </BankDetail>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.2 }}
            >
              <BankDetail>
                <DetailLabel>Bank Name</DetailLabel>
                <DetailValue>
                  <DetailText>{account.bankName}</DetailText>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{
                      background:
                        copiedItem === `${index}-bank` ? '#10b981' : '#D4AF37',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                    }}
                    onClick={() =>
                      copyToClipboard(account.bankName, `${index}-bank`)
                    }
                  >
                    {copiedItem === `${index}-bank` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedItem === `${index}-bank` ? 'Copied' : 'Copy'}
                  </motion.button>
                </DetailValue>
              </BankDetail>
            </motion.div>
          </CurrencyCard>
        ))}
      </CurrencyGrid>
    </BankContainer>
  );
}
