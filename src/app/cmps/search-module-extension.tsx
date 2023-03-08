export function SearchModuleExtension({ activeModule }: { activeModule: string }) {
    const getModuleClass = () => {
        if (activeModule === 'startDate' || activeModule === 'endDate') return 'datepicker'
        return activeModule
    }
    return <section className={`search-module-extension ${getModuleClass()}`}>Hello from SearchModuleExtension</section>
}
