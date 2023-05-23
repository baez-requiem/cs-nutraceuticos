import React, { Suspense } from "react"
import { Loader, Flex } from "src/components/ui"

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense
			fallback={
				<Flex justify="center" items="center" style={{ height: '100%' }}>
					<Loader />
				</Flex>
			}
		>
			<Comp />
		</Suspense>
	)
}

export default lazyLoad