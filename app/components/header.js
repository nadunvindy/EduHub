export default function Header() {
    return (
        <div className="flex p-6 content-center justify-between bg-primary text-white">
            <h1 className="text-lg ">Welcome to EduHub</h1>
            <div className="self-end">
                <a className="text-lg px-4">Home</a>
                <a className="text-lg px-4">Signup</a>
            </div>
        </div>
    )
}