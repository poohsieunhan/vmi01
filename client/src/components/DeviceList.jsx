import React from 'react'

export default function DeviceList({ devices = [] }) {
  if (!devices.length) return <p>Chưa có thiết bị nào.</p>

  return (
    <ul>
      {devices.map((d) => (
        <li key={d.Id || d.id}>
          <strong>{d.TenThietBi || d.name || 'N/A'}</strong>
          {d.MaThietBi && <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Mã: {d.MaThietBi}</div>}
        </li>
      ))}
    </ul>
  )
}
