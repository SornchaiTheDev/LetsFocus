import React from 'react'
import {Circular, InnerCircular , OuterTimerLeft , OuterTimerRight , ProgressLeft , ProgressRight} from '../css/Timerbar'
function Timerbar() {
    return (
        
        <Circular >
            <OuterTimerLeft> 
                <ProgressLeft />
            </OuterTimerLeft>
            <OuterTimerRight >

                <ProgressRight />
            </OuterTimerRight>
            
            <InnerCircular>
                25:00
            </InnerCircular>
        </Circular>
    )
}

export default Timerbar
