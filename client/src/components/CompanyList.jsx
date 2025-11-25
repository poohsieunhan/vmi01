import React, { useState } from 'react'
import CompanyForm from './CompanyForm'

export default function CompanyList({ companies = [], onRefresh }) {
  const [showModal, setShowModal] = useState(false)

  const handleCreate = (newCompany) => {
    setShowModal(false)
    onRefresh && onRefresh()
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setShowModal(true)}>+ Tạo Mới Công Ty</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Tạo Mới Công Ty</h2>
            <CompanyForm onSuccess={handleCreate} />
            <button onClick={() => setShowModal(false)} style={{ marginTop: '16px', background: '#999' }}>
              Đóng
            </button>
          </div>
        </div>
      )}

      {companies.length === 0 ? (
        <p>Chưa có công ty nào.</p>
      ) : (
        <ul>
          {companies.map((c) => (
            <li key={c.Id || c.id}>
              <strong>{c.TenCongTy || c.name || 'N/A'}</strong>
              {c.DiaChi && <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Địa chỉ: {c.DiaChi}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
