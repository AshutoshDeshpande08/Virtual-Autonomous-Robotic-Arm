import numpy as np


def dh_transform(
    a: float,
    alpha: float,
    d: float,
    theta: float
) -> np.ndarray:
    """
    Create a Denavit-Hartenberg transformation matrix.

    Parameters:
        a      : Link length
        alpha  : Link twist in radians
        d      : Link offset
        theta  : Joint angle in radians
    """

    cos_theta = np.cos(theta)
    sin_theta = np.sin(theta)
    cos_alpha = np.cos(alpha)
    sin_alpha = np.sin(alpha)

    return np.array([
        [
            cos_theta,
            -sin_theta * cos_alpha,
            sin_theta * sin_alpha,
            a * cos_theta
        ],
        [
            sin_theta,
            cos_theta * cos_alpha,
            -cos_theta * sin_alpha,
            a * sin_theta
        ],
        [
            0,
            sin_alpha,
            cos_alpha,
            d
        ],
        [
            0,
            0,
            0,
            1
        ]
    ])


def forward_kinematics(dh_parameters):
    """
    Calculate the transformation matrix from
    the robot base to the end effector.
    """

    transform = np.eye(4)

    for a, alpha, d, theta in dh_parameters:
        transform = transform @ dh_transform(
            a,
            alpha,
            d,
            theta
        )

    return transform


def get_position(transform):
    """
    Extract XYZ position from a transformation matrix.
    """

    return transform[:3, 3]