import { ButtonLight } from 'components/Button'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CheckBox, Flex, Text } from 'ui/src'
import { v4 as uuidv4 } from 'uuid'
import { useAccount } from '../../hooks/useAccount'
import { useAccountDrawer } from '../AccountDrawer/MiniPortfolio/hooks'
import Discounts from './Discounts'

interface Discount {
  id: string
}

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #fc72ff;
  margin: 5px 0;
`

const EnableOgDiscounts: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [discounts, setDiscounts] = useState<Discount[]>([{ id: uuidv4() }])
  const { isDisconnected } = useAccount()
  const toggleWalletDrawer = useAccountDrawer()

  const addDiscount = () => {
    setDiscounts([...discounts, { id: uuidv4() }])
  }

  const removeDiscount = (id: string) => {
    setDiscounts(discounts.filter((discount) => discount.id !== id))
  }

  const handleEnableDiscounts = () => {
    setIsEnabled(!isEnabled)
    setDiscounts([{ id: uuidv4() }])
  }

  return (
    <>
      {isDisconnected ? (
        <ButtonLight onClick={toggleWalletDrawer.open} fontWeight={535} $borderRadius="16px">
          Connect wallet
        </ButtonLight>
      ) : (
        <div>
          <Flex backgroundColor="$surface2" borderRadius="$rounded16" p="$spacing12" width="100%">
            <CheckBox
              checked={isEnabled}
              text={
                <Flex>
                  <Text color="$neutral1" variant="body1">
                    Enable OG Discounts
                  </Text>
                </Flex>
              }
              onCheckPressed={handleEnableDiscounts}
            />
          </Flex>
          {isEnabled && (
            <>
              {discounts.map((discount) => (
                <div key={discount.id} style={{ marginBottom: '10px' }}>
                  <Discounts id={discount.id} removeSectionCallback={removeDiscount} />
                  <Separator />
                </div>
              ))}
              <ButtonLight onClick={addDiscount} fontWeight={535} $borderRadius="16px">
                Add new section
              </ButtonLight>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default EnableOgDiscounts
