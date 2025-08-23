import { Module } from "@medusajs/framework/utils"
import InfoModuleService from "./service"
export const INFO_MODULE = "info"
export default Module(INFO_MODULE, {
    service: InfoModuleService,
})