import '../styles/404.module.css';

export default function Custom404() {
    return (
        <div className="grid grid-cols-1 place-items-center h-screen w-full">
            <div className="text-center s1">
                <h1 className="text-right inline pr-2 pt-4 pb-4 border-r-2 border-gray-300">
                    404
                </h1>
                <h2 className="inline text-left pl-2">
                    These are not the droids you're looking for.
                </h2>
            </div>
        </div>
    );
}
