import React from 'react'
import format from 'date-fns/format'

const UserList = props => (
  <div>
    <h4>Active Users</h4>
    <table className="striped">
      <thead>
        <tr>
          <th data-field="id">Nickname</th>
          <th data-field="name">Time joined</th>
        </tr>
      </thead>

      <tbody>
        {props.userlist.map((user, index) => {
          return (
            <tr key={user.nickname}>
              <td>{user.nickname}</td>
              <td>
                {format(
                  parseInt(user.connectTime, 10),
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default UserList
