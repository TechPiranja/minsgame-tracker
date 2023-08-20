import { useRef } from 'react'
import {
  NumberInput,
  Group,
  ActionIcon,
  rem,
  NumberInputHandlers,
} from '@mantine/core'

export const CustomNumberInput = ({
  value,
  setValue,
}: {
  value: number
  setValue: any
}) => {
  const handlers = useRef<NumberInputHandlers>()

  return (
    <Group spacing={10}>
      <ActionIcon
        size={40}
        variant="default"
        onClick={() => handlers.current?.decrement()}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        handlersRef={handlers}
        max={470}
        min={0}
        step={1}
        styles={{ input: { width: rem(48), textAlign: 'center', height: 40 } }}
      />

      <ActionIcon
        size={40}
        variant="default"
        onClick={() => handlers.current?.increment()}
      >
        +
      </ActionIcon>
    </Group>
  )
}
