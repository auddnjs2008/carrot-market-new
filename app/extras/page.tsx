
async function getData() {
    fetch('https://nomad-movies.nomadcoders.workers.dev/movies');
}

export default async function Extras() {
    await getData();
    return (
        <div className='flex flex-col gap-3 py-10'>
            <h1 className='text-6xl font-rubick'>Extras!</h1>
            <h2 className='font-roboto'>So much more to learn!</h2>
        </div>
    )
}