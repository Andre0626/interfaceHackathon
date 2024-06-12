import { useState } from 'react'
import Row from '../Row'
import ConfigInput from './ConfigInput'
import EnableOgDiscounts from './EnableOgDiscounts'

interface ConfigInputProps {
  baseCurrency: any
}

type FidelityConfig = {
  lowerThreshold: string
  upperThreshold: string
  lowerFee: string
  upperFee: string
  duration: string
}

const SetupFidelityCampaign = ({ baseCurrency }: ConfigInputProps) => {
  const [fidelityConfig, setFidelityConfig] = useState<FidelityConfig>({
    lowerThreshold: '',
    upperThreshold: '',
    lowerFee: '',
    upperFee: '',
    duration: '',
  })

  const { lowerThreshold, upperThreshold, lowerFee, upperFee, duration } = fidelityConfig

  const handleInputChange = (field: keyof FidelityConfig) => (value: string) => {
    setFidelityConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }))
  }

  return (
    <>
      <Row justify="space-between" gap="sm">
        <ConfigInput
          value={lowerThreshold}
          title="Lower threshold"
          symbol={baseCurrency}
          onInputChange={handleInputChange('lowerThreshold')}
        />
        <ConfigInput
          value={upperThreshold}
          title="Upper threshold"
          symbol={baseCurrency}
          onInputChange={handleInputChange('upperThreshold')}
        />
      </Row>

      <Row justify="space-between" gap="sm">
        <ConfigInput value={lowerFee} title="Lower fee" symbol="%" onInputChange={handleInputChange('lowerFee')} />
        <ConfigInput value={upperFee} title="Upper fee" symbol="%" onInputChange={handleInputChange('upperFee')} />
        <ConfigInput value={duration} title="Duration (days)" symbol="" onInputChange={handleInputChange('duration')} />
      </Row>
      <EnableOgDiscounts />
    </>
  )
}

export default SetupFidelityCampaign
