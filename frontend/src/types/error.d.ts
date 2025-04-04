import { AxiosError } from "axios";

type ErrorResponse = AxiosError<{ message: string }>