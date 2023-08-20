import './App.css'
import { useEffect, useState } from 'react'
import { CustomNumberInput } from './components'
import { Button } from '@mantine/core'

interface ProgressDataItem {
  day: number
  items: number
  date?: Date
}

function createRow({ day, items }: { day: number; items: number }) {
  const row = []
  for (let i = 0; i < day; i++) {
    row.push(
      <div
        key={i}
        className="block"
        style={{ background: i <= items - 1 ? 'green' : 'transparent' }}
      ></div>
    )
  }
  return <div className="row">{row}</div>
}

const updateProgress = (
  progressData: ProgressDataItem[],
  updateProgress: any,
  items: number,
  setValue: any
) => {
  const reversedList = progressData.reverse()

  const updatedProgress = reversedList.map((data) => {
    if (data.day <= items && !data.date) {
      items = items - data.day
      return { ...data, items: data.day, date: new Date() }
    }
    return data
  })
  localStorage.setItem(
    'progressData',
    JSON.stringify(updatedProgress.reverse())
  )
  updateProgress(updatedProgress)
  setValue(items)
}

export const App = () => {
  const [value, setValue] = useState(0)
  const [progressData, setProgressData] = useState<ProgressDataItem[]>([])

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    const storedProgress = JSON.parse(
      localStorage.getItem('progressData') || '[]'
    ) as ProgressDataItem[]

    if (storedProgress.length === 0) {
      const initialProgressData: ProgressDataItem[] = Array.from(
        { length: 30 },
        (_, index) => ({
          day: index + 1,
          items: 0,
        })
      )
      localStorage.setItem('progressData', JSON.stringify(initialProgressData))
      setProgressData(initialProgressData)
    } else {
      setProgressData(storedProgress)
    }
  }

  function clearData(): void {
    localStorage.removeItem('progressData')
    loadData()
  }

  return (
    <div className="App">
      <div
        className="row"
        style={{
          gap: 10,
          margin: '30px 0px 10px 0px',
          justifyContent: 'space-between',
        }}
      >
        <Button style={{ height: 45, background: 'red' }} onClick={clearData}>
          Clear
        </Button>
        <CustomNumberInput value={value} setValue={setValue} />

        <Button
          style={{ height: 45 }}
          onClick={() =>
            updateProgress(progressData, setProgressData, value, setValue)
          }
        >
          Add
        </Button>
      </div>

      <div className="pyramid">
        {progressData.map((data) => (
          <div key={data.day} className="rowWrapper">
            <p className="dayText">Day: {data.day}</p>
            {createRow(data)}
          </div>
        ))}
      </div>
    </div>
  )
}
