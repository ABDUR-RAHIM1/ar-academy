import { Button } from '@/components/ui/button' 
import React from 'react'

export default function SubmitButton({ loadingState, btnText }) {
    return (
        <div>
            {
                loadingState ?
                    <Button> {"Loading . . ."}</Button>
                    :
                    <Button type="submit"> {btnText || "Submit"}</Button>
            }
        </div>
    )
}
