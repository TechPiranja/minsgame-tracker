import { useDisclosure } from '@mantine/hooks'
import { Modal, Button } from '@mantine/core'

export function ClearModal({ clearData }: { clearData: any }) {
  const [opened, { open, close }] = useDisclosure(false)

  function closeModal() {
    clearData()
    close()
  }

  return (
    <>
      <Modal
        style={{ top: 0, left: 0, position: 'absolute' }}
        opened={opened}
        onClose={close}
        title="Clear all data"
        size="auto"
      >
        <p>
          This will delete all your data permanently. You cannot undo this
          action.
        </p>
        <div
          style={{ display: 'flex', gap: 20, justifyContent: 'space-between' }}
        >
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button style={{ background: '#FF6D60' }} onClick={closeModal}>
            Delete
          </Button>
        </div>
      </Modal>

      <Button style={{ height: 40, background: '#FF6D60' }} onClick={open}>
        Clear
      </Button>
    </>
  )
}
