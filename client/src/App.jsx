import React, { useEffect, useState } from 'react'
import CompanyList from './components/CompanyList'
import CompanyForm from './components/CompanyForm'
import DeviceList from './components/DeviceList'
import RequestFormList from './components/RequestFormList'

export default function App() {
  const [view, setView] = useState('company')
  const [companies, setCompanies] = useState([])
  const [devices, setDevices] = useState([])
  const [requestForms, setRequestForms] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('Fetching companies...')
    fetch('/api/v1/company')
      .then((r) => {
        console.log('API Response status:', r.status)
        if (!r.ok) {
          throw new Error(`HTTP ${r.status}`)
        }
        return r.json()
      })
      .then((res) => {
        console.log('API Response:', res)
        const companies = res.metadata?.data || res.data || res || []
        console.log('Setting companies:', companies)
        setCompanies(companies)
        setError('')
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setError('Lỗi tải danh sách công ty: ' + err.message)
      })
  }, [])

  useEffect(() => {
    if (view === 'device') {
      fetch('/api/v1/device')
        .then((r) => r.json())
        .then((data) => setDevices(data))
        .catch((err) => console.error(err))
    }
  }, [view])

  useEffect(() => {
    if (view === 'requestform') {
      fetch('/api/v1/requestform')
        .then((r) => r.json())
        .then((data) => setRequestForms(data))
        .catch((err) => console.error(err))
    }
  }, [view])

  return (
    <div className="app">
      <nav className="menu">
        <button
          className={`menu-btn ${view === 'company' ? 'active' : ''}`}
          onClick={() => setView('company')}
        >
          Công Ty
        </button>
        <button
          className={`menu-btn ${view === 'device' ? 'active' : ''}`}
          onClick={() => setView('device')}
        >
          Thiết Bị
        </button>
        <button
          className={`menu-btn ${view === 'requestform' ? 'active' : ''}`}
          onClick={() => setView('requestform')}
        >
          Phiếu Tiếp Nhận
        </button>
      </nav>

      <div className="content">
        {error && <div style={{ background: '#fee', color: '#c33', padding: '12px', marginBottom: '16px', borderRadius: '4px' }}>{error}</div>}
        {view === 'company' && (
          <>
            <h1>Danh Mục Công Ty</h1>
            <CompanyList companies={companies} onRefresh={() => {
              fetch('/api/v1/company')
                .then((r) => r.json())
                .then((res) => {
                  const companies = res.metadata?.data || res.data || res || []
                  setCompanies(companies)
                  setError('')
                })
                .catch((err) => {
                  console.error(err)
                  setError('Lỗi: ' + err.message)
                })
            }} />
          </>
        )}
        {view === 'device' && (
          <>
            <h1>Danh Mục Thiết Bị</h1>
            <DeviceList devices={devices} />
          </>
        )}
        {view === 'requestform' && (
          <>
            <h1>Danh Mục Phiếu Tiếp Nhận</h1>
            <RequestFormList requestForms={requestForms} />
          </>
        )}
      </div>
    </div>
  )
}
