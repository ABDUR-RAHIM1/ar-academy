import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function SubmitButton({ loadingState, text }) {
    return (
        <div>
            {
                loadingState ?
                    <Button disabled>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </Button>
                    :
                    <Button type="submit">Add {text || ""}</Button>
            }
        </div>
    )
}
