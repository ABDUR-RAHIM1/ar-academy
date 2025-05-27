import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function SubmitButton({ loadingState, btnText }) {
    return (
        <Button type="submit" disabled={loadingState} className="flex items-center justify-center gap-2">
            {loadingState && <LoaderIcon className="animate-spin w-8 h-8 text-white" />}
            {loadingState ? "...." : (btnText || "Submit")}
        </Button>
    )
}
