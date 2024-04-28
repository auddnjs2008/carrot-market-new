import TabBar from '@/components/tab-bar';

interface Props {
    children: React.ReactNode;
}
export default function TabLayout({ children }: Props) {
    return <div>
        {children}
        <TabBar />
    </div>
}