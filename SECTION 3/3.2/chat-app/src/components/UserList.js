import React from 'react'

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
                {user.connectTime}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default UserList
