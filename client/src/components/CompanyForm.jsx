import React, { useState } from 'react'

export default function CompanyForm({ onSuccess, onCreate }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = { TenCongTy: name, DiaChi: address }
    try {
      const res = await fetch('/api/v1/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess && onSuccess(data)
        onCreate && onCreate(data)
        setName('')
        setAddress('')
      } else {
        setError(data.message || 'Lỗi khi tạo công ty')
      }
    } catch (err) {
      setError('Lỗi: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <div style={{ marginBottom: '12px' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên công ty"
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Địa chỉ"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      {error && <div style={{ color: 'red', marginBottom: '12px', fontSize: '12px' }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Đang tạo...' : 'Tạo Công Ty'}
      </button>
    </form>
  )
}
