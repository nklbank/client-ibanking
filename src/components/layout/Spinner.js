import React, { Fragment } from 'react'
import spinner from './spinner.gif';

const Spinner = () => <Fragment >
    <div className="mt-5">
        <img src={spinner} alt="Loading..." style={{ width: '100px', margin: 'auto', display: 'flex'  }} className="rounded-circle mt-5" />
    </div>
</Fragment>

export default Spinner
