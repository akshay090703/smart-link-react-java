import { ContactIcon } from 'lucide-react'

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <ContactIcon className="h-6 w-6" />
            <div className="text-xl font-semibold">
                SmartLink
            </div>
        </div>
    )
}

export default Logo