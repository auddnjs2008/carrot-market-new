import getSession from './session'

const logined = async (id:number) => {
    const session = await getSession();
    session.id = id;
    await session.save();
}

export default logined;