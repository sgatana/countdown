import React from 'react'

export const Controls = ({paused, onTogglePaused}) => {
  return (
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <button className="button is-danger is-outlined" 
                disabled={paused} 
                onClick={onTogglePaused}>
          Pause
         </button>
      </p>
      <p className="control">
        <button className="button is-success is-outlined" 
                disabled={!paused} 
                onClick={onTogglePaused}>
          Resume
        </button>
      </p>
    </div>
  )
}