import React from "react"

const Footer: React.FC = () => {
    return (
        <div className="p-16 text-center">
            <span>© 2023 Copyright:</span>
            <a
                className="font-semibold text-neutral-600 dark:text-neutral-400"
                href="https://tailwind-elements.com/"
            >
                Company
            </a>
        </div>

    )
}
export default Footer