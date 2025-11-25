import React from 'react'

export default function RequestFormList({ requestForms = [] }) {
  if (!requestForms.length) return <p>Chưa có phiếu tiếp nhận nào.</p>

  return (
    <ul>
      {requestForms.map((rf) => (
        <li key={rf.Id || rf.id}>
          <strong>{rf.MaPhieu || rf.code || 'N/A'}</strong>
          {rf.NoiDung && <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Nội dung: {rf.NoiDung}</div>}
          {rf.NgayTao && <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Ngày tạo: {new Date(rf.NgayTao).toLocaleDateString('vi-VN')}</div>}
        </li>
      ))}
    </ul>
  )
}
