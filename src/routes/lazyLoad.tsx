import React, { Suspense } from "react"
import { Loader } from "src/components/ui"

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense	fallback={<Loader />}>
			<Comp />
		</Suspense>
	)
}

export default lazyLoad