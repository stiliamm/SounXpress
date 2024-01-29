import os
import math
from fastapi import APIRouter, HTTPException, Header, status
from utils.auth import authenticate
from common.models.room_node import RoomNode, nx, ny, nz

stw_calc_router = APIRouter(prefix='/calculator')


@stw_calc_router.post('/room_nodes', tags=["Calculator"])
def get_room_nodes(proportions: RoomNode, x_token: str = Header()):
    authenticate(x_token)
    length = proportions.length
    width = proportions.width
    height = proportions.height
    try:
        nodes = {}
        for a, b, c in zip(nx, ny, nz):
            freq = round(172 * math.sqrt((a / length) ** 2 +
                                         (b / width) ** 2 + (c / height) ** 2))

            nodes[f'{a}-{b}-{c}'] = freq

        return nodes
    except Exception:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
