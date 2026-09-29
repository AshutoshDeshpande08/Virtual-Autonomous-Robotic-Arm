from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .robotics.robot import RobotArm


app = FastAPI(
    title="Virtual Autonomous Robotic Arm",
    description="Robot controller API for the virtual 6-axis robotic arm",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


robot = RobotArm()


class JointCommand(BaseModel):
    joint: int
    angle: float


@app.get("/")
def root():
    return {
        "name": "Virtual Autonomous Robotic Arm",
        "status": "online",
        "joints": 6,
    }


@app.get("/robot/state")
def get_robot_state():
    position = robot.get_end_effector_position()

    return {
        "joints": robot.get_joint_angles(),
        "end_effector": {
            "x": float(position[0]),
            "y": float(position[1]),
            "z": float(position[2]),
        },
    }


@app.post("/robot/joint")
def set_joint(command: JointCommand):
    try:
        robot.set_joint_angle(
            command.joint,
            command.angle,
        )

    except (IndexError, ValueError) as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    position = robot.get_end_effector_position()

    return {
        "success": True,
        "joints": robot.get_joint_angles(),
        "end_effector": {
            "x": float(position[0]),
            "y": float(position[1]),
            "z": float(position[2]),
        },
    }


@app.post("/robot/home")
def home_robot():
    robot.home()

    position = robot.get_end_effector_position()

    return {
        "success": True,
        "joints": robot.get_joint_angles(),
        "end_effector": {
            "x": float(position[0]),
            "y": float(position[1]),
            "z": float(position[2]),
        },
    }