import { ButtonGray } from 'components/Button'
import Row, { RowFixed } from '../Row'

import { Currency } from '@uniswap/sdk-core'
import { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import { Trans } from '../../i18n/Trans'
import { CurrencySelect } from '../CurrencyInputPanel/SwapCurrencyInputPanel'
import { formatCurrencySymbol } from '../CurrencyInputPanel/utils'
import CurrencyLogo from '../Logo/CurrencyLogo'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import ConfigInput from './ConfigInput'

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.25rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size: 20px;
  font-weight: 535;
`
const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.35rem;
  height: 35%;
  margin-left: 8px;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.neutral1 : theme.neutralContrast)};
    stroke-width: 2px;
  }
`

const StyledCurrencySelect = styled(CurrencySelect)`
  // Add your styles here. For example:
  height: 35px;
  border-radius: 8px !important;
  margin-left: 0 !important;
`

const StyledRemoveSectionButton = styled(ButtonGray)`
  height: 35px !important;
  border-radius: 8px !important;
  margin-top: 8px;
`

interface DiscountState {
  currency: Currency | null
  volume: string
  feeReduction: string
}

interface DiscountsProps {
  removeSectionCallback: (id: string) => void
  id: string
}

const Discounts = ({ id, removeSectionCallback }: DiscountsProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [discounts, setDiscounts] = useState<DiscountState>({
    currency: null,
    volume: '',
    feeReduction: '',
  })

  const { currency, volume, feeReduction } = discounts

  const handleDismissSearch = () => {
    setModalOpen(false)
  }
  const handleOnCurrencySelect = (token: Currency) => {
    setDiscounts({
      ...discounts,
      currency: token,
    })
  }

  return (
    <>
      <Row justify="space-between" gap="sm" mt="2">
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <StyledCurrencySelect
            disabled={false}
            visible={true}
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              setModalOpen(true)
            }}
          >
            <Aligner>
              <RowFixed>
                {currency && <CurrencyLogo style={{ marginRight: '2px' }} currency={currency} size={24} />}
                <StyledTokenName className="token-symbol-container" active={Boolean(currency)}>
                  {currency ? formatCurrencySymbol(currency) : <Trans i18nKey="common.token" />}
                </StyledTokenName>
              </RowFixed>
              <StyledDropDown selected={!!currency} />
            </Aligner>
          </StyledCurrencySelect>
          <StyledRemoveSectionButton onClick={() => removeSectionCallback(id)}>Remove -</StyledRemoveSectionButton>
        </div>

        <ConfigInput
          value={volume}
          title="Volume"
          symbol={currency && currency.symbol ? currency.symbol : ''}
          onInputChange={(val) =>
            setDiscounts({
              ...discounts,
              volume: val,
            })
          }
        />

        <ConfigInput
          value={feeReduction}
          title="Fee reduction"
          symbol="%"
          onInputChange={(val) =>
            setDiscounts({
              ...discounts,
              feeReduction: val,
            })
          }
        />
      </Row>

      <CurrencySearchModal
        isOpen={modalOpen}
        onDismiss={handleDismissSearch}
        onCurrencySelect={handleOnCurrencySelect}
        selectedCurrency={currency}
        otherSelectedCurrency={null}
        currencySearchFilters={undefined}
      />
    </>
  )
}

export default Discounts
