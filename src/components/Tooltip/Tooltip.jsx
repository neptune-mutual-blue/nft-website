import * as Tooltip from '@radix-ui/react-tooltip'

const CustomTooltip = (props) => {
  const { children, text, disabled } = props
  return disabled
    ? children
    : (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {children}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className='TooltipContent' sideOffset={5}>
              {text}
              <Tooltip.Arrow className='TooltipArrow' />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      )
}

export { CustomTooltip }
