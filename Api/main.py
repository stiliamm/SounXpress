from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.login_router import login_router
from routers.register_router import regitser_router
from routers.play_router import play_router
from routers.save_router import save_router
from routers.stop_router import stop_router
from routers.messages_router import messages_router
from routers.users_router import users_router

app = FastAPI()
origins = [
    "http://localhost",
    "https://localhost",
    "192,168.1.4:3000",
    "http://localhost:3000",
    "localhost:3000",
    "https://localhost:3000",
    "http://192.168.1.4:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(regitser_router)
app.include_router(play_router)
app.include_router(save_router)
app.include_router(stop_router)
app.include_router(messages_router)
app.include_router(users_router)
