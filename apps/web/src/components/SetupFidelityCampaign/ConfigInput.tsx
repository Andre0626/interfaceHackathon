import { styled as tamaguiStyled } from '@tamagui/core'
import { OutlineCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import styled from 'styled-components'
import { Text } from 'ui/src'

import { Input as NumericalInput } from '../NumericalInput'

const FocusedOutlineCard = styled(OutlineCard)<{ active?: boolean; pulsing?: boolean }>`
  border-color: ${({ active, theme }) => active && theme.deprecated_stateOverlayPressed};
  padding: 12px;
  width: 100%;
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledInput = styled(NumericalInput)<{ usePercent?: boolean }>`
  background-color: transparent;
  font-weight: 535;
  text-align: left;
  width: 100%;

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    font-size: 16px;
  `};
`

const InputColumn = styled(AutoColumn)`
  width: 100%;
`

const InputTitle = tamaguiStyled(Text, {
  fontSize: 12,
  fontWeight: '$medium',
  color: '$neutral2',
})

interface ConfigInputProps {
  title: string
  symbol: string
  value: string
  onInputChange: (value: string) => void
}

const ConfigInput = ({ title, symbol, value, onInputChange }: ConfigInputProps) => {
  return (
    <FocusedOutlineCard>
      <InputColumn justify="flex-start">
        <InputTitle fontSize={12} textAlign="center">
          {title}
        </InputTitle>
        <InputWrapper>
          <span style={{ marginRight: '5px' }}>{symbol}</span>
          <StyledInput
            className="rate-input-0"
            value={value}
            fontSize="20px"
            disabled={false}
            onUserInput={(val) => {
              onInputChange(val)
            }}
          />
        </InputWrapper>
      </InputColumn>
    </FocusedOutlineCard>
  )
}

export default ConfigInput
