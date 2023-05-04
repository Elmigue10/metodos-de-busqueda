import React from 'react'
import PropTypes from 'prop-types'
import { chunk, isUndefined } from 'lodash'

function Node({ state, title = undefined }) {
  return (
    <div className='node-container'>
      {!isUndefined(title) && <h3 className='node-title'>{title}</h3>}
      <table className='node'>
        <tbody className='node__body'>
          {chunk(state, 3).map((row, i) => (
            <tr className='node__row' key={`${i}`}>
              {row.map((st, j) => (
                <td className='node__cell' key={`${i}__${j}__${st}`}>
                  {st > 0 && st}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Node.propTypes = {
  state: PropTypes.array,
  onChange: PropTypes.func,
  title: PropTypes.string,
}

export default Node
