import './App.css'
import { useEffect, useState } from 'react'
import { CustomNumberInput, ClearModal } from './components'
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
        style={{
          background: i <= items - 1 ? '#98D8AA' : 'transparent',
          borderColor: i <= items - 1 ? 'transparent' : '#000',
        }}
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div className="App">
        <div
          className="row"
          style={{ justifyContent: 'space-between', marginBottom: 10 }}
        >
          <h2>Minsgame Tracker</h2>
          <a href="https://www.theminimalists.com/game/">#MinsGame</a>
        </div>

        <div
          className="row"
          style={{
            gap: 10,
            margin: '0px 0px 20px 0px',
            justifyContent: 'space-between',
          }}
        >
          <ClearModal clearData={clearData} />
          <CustomNumberInput value={value} setValue={setValue} />

          <Button
            style={{ height: 40, background: '#98D8AA' }}
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
      <div
        className="row"
        style={{
          gap: 20,
          bottom: 5,
          justifyContent: 'center',
          width: '100vw',
          left: 0,
        }}
      >
        <a
          style={{ textDecoration: 'none', color: '#000' }}
          href="https://anja-stricker.de/#/impressum"
        >
          Impressum
        </a>
        <a
          style={{ textDecoration: 'none', color: '#000' }}
          href="https://anja-stricker.de/#/datenschutz"
        >
          Datenschutz
        </a>
      </div>
    </div>
  )
}
