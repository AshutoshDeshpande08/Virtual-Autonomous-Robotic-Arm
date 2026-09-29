import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const API_URL = "/api";

const BODY = "#d9dde1";
const BODY_DARK = "#363b40";
const JOINT = "#f28c28";
const METAL = "#8f969d";
const TCP = "#ff4538";

const deg = (value: number) =>
  THREE.MathUtils.degToRad(value);


/* =========================================================
   ARM LINK
   ========================================================= */

function ArmLink({
  length,
  width,
}: {
  length: number;
  width: number;
}) {
  return (
    <group>
      <mesh position={[0, length / 2, 0]}>
        <capsuleGeometry
          args={[
            width,
            Math.max(length - width * 2, 0.05),
            16,
            32,
          ]}
        />

        <meshStandardMaterial
          color={BODY}
          metalness={0.35}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[0, length / 2, 0]}
        scale={[0.78, 0.9, 0.78]}
      >
        <capsuleGeometry
          args={[
            width * 0.82,
            Math.max(length - width * 2, 0.05),
            12,
            24,
          ]}
        />

        <meshStandardMaterial
          color={BODY_DARK}
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   JOINT
   ========================================================= */

function JointHousing({
  size,
  axis = "z",
}: {
  size: number;
  axis?: "x" | "y" | "z";
}) {
  const rotation =
    axis === "x"
      ? [0, Math.PI / 2, 0]
      : axis === "y"
        ? [Math.PI / 2, 0, 0]
        : [0, 0, 0];

  return (
    <group>
      <mesh>
        <sphereGeometry args={[size, 32, 24]} />

        <meshStandardMaterial
          color={BODY}
          metalness={0.4}
          roughness={0.28}
        />
      </mesh>

      <mesh
        rotation={rotation as [number, number, number]}
      >
        <cylinderGeometry
          args={[
            size * 0.58,
            size * 0.58,
            size * 0.22,
            32,
          ]}
        />

        <meshStandardMaterial
          color={JOINT}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   BASE
   ========================================================= */

function Base() {
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry
          args={[0.72, 0.82, 0.24, 48]}
        />

        <meshStandardMaterial
          color={BODY_DARK}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry
          args={[0.52, 0.6, 0.4, 48]}
        />

        <meshStandardMaterial
          color={BODY}
          metalness={0.45}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, 0.6, 0]}>
        <torusGeometry
          args={[0.49, 0.045, 16, 48]}
        />

        <meshStandardMaterial
          color={JOINT}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   WRIST
   ========================================================= */

function Wrist() {
  return (
    <group>
      <mesh>
        <cylinderGeometry
          args={[0.17, 0.2, 0.32, 32]}
        />

        <meshStandardMaterial
          color={BODY_DARK}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry
          args={[0.13, 0.13, 0.08, 32]}
        />

        <meshStandardMaterial
          color={METAL}
          metalness={0.85}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, -0.31, 0]}>
        <sphereGeometry
          args={[0.065, 24, 24]}
        />

        <meshStandardMaterial
          color={TCP}
          emissive="#550000"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   ROBOT
   ========================================================= */

function RobotArm({
  joints,
}: {
  joints: number[];
}) {
  const [
    j1,
    j2,
    j3,
    j4,
    j5,
    j6,
  ] = joints;

  return (
    <group>
      <Base />

      <group rotation={[0, deg(j1), 0]}>
        <mesh position={[0, 0.88, 0]}>
          <capsuleGeometry
            args={[0.25, 0.42, 16, 32]}
          />

          <meshStandardMaterial
            color={BODY}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>

        <JointHousing
          size={0.31}
          axis="y"
        />

        <group
          position={[0, 1.05, 0]}
          rotation={[0, 0, deg(j2)]}
        >
          <ArmLink
            length={1.35}
            width={0.24}
          />

          <JointHousing
            size={0.3}
            axis="x"
          />

          <group
            position={[0, 1.35, 0]}
            rotation={[0, 0, deg(j3)]}
          >
            <ArmLink
              length={1.1}
              width={0.21}
            />

            <JointHousing
              size={0.27}
              axis="x"
            />

            <group
              position={[0, 1.1, 0]}
              rotation={[deg(j4), 0, 0]}
            >
              <ArmLink
                length={0.62}
                width={0.17}
              />

              <JointHousing
                size={0.23}
                axis="z"
              />

              <group
                position={[0, 0.62, 0]}
                rotation={[0, 0, deg(j5)]}
              >
                <ArmLink
                  length={0.4}
                  width={0.14}
                />

                <JointHousing
                  size={0.19}
                  axis="x"
                />

                <group
                  position={[0, 0.4, 0]}
                  rotation={[deg(j6), 0, 0]}
                >
                  <Wrist />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}


/* =========================================================
   JOINT CONTROL
   ========================================================= */

function JointControl({
  index,
  value,
  onChange,
}: {
  index: number;
  value: number;
  onChange: (
    index: number,
    value: number
  ) => void;
}) {
  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span>
          J{index + 1}
        </span>

        <span
          style={{
            color: "#d6a84f",
            fontFamily: "monospace",
          }}
        >
          {value.toFixed(1)}°
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <button
          onClick={() =>
            onChange(
              index,
              Math.max(-180, value - 1)
            )
          }
          style={{
            width: 34,
            height: 34,
            background: "#20242a",
            color: "white",
            border: "1px solid #41464d",
            borderRadius: 6,
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          −
        </button>

        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={value}
          onChange={(event) =>
            onChange(
              index,
              Number(event.target.value)
            )
          }
          style={{
            flex: 1,
          }}
        />

        <button
          onClick={() =>
            onChange(
              index,
              Math.min(180, value + 1)
            )
          }
          style={{
            width: 34,
            height: 34,
            background: "#20242a",
            color: "white",
            border: "1px solid #41464d",
            borderRadius: 6,
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}


/* =========================================================
   APP
   ========================================================= */

function App() {
  const [joints, setJoints] =
    useState<number[]>([
      0,
      0,
      0,
      0,
      0,
      0,
    ]);

  const [connected, setConnected] =
    useState(false);


  /* =======================================================
     LOAD ROBOT STATE
     ======================================================= */

  useEffect(() => {
    fetch(`${API_URL}/robot/state`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Backend unavailable"
          );
        }

        return response.json();
      })
      .then((data) => {
        setJoints(data.joints);
        setConnected(true);
      })
      .catch((error) => {
        console.error(
          "Backend connection failed:",
          error
        );

        setConnected(false);
      });
  }, []);


  /* =======================================================
     UPDATE JOINT
     ======================================================= */

  const updateJoint = async (
    index: number,
    value: number
  ) => {
    const clampedValue =
      Math.max(
        -180,
        Math.min(180, value)
      );

    try {
      const response =
        await fetch(
          `${API_URL}/robot/joint`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              joint: index,
              angle: clampedValue,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Joint command failed"
        );
      }

      const data =
        await response.json();

      setJoints(data.joints);
      setConnected(true);

    } catch (error) {
      console.error(
        "Joint command failed:",
        error
      );

      setConnected(false);
    }
  };


  /* =======================================================
     HOME
     ======================================================= */

  const homeRobot = async () => {
    try {
      const response =
        await fetch(
          `${API_URL}/robot/home`,
          {
            method: "POST",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Home command failed"
        );
      }

      const data =
        await response.json();

      setJoints(data.joints);
      setConnected(true);

    } catch (error) {
      console.error(
        "Home command failed:",
        error
      );

      setConnected(false);
    }
  };


  /* =======================================================
     UI
     ======================================================= */

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: "#080a0d",
        color: "white",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      <div
        style={{
          flex: 1,
        }}
      >
        <Canvas
          camera={{
            position: [
              4.8,
              3.3,
              5.8,
            ],
            fov: 48,
          }}
        >
          <ambientLight
            intensity={1.4}
          />

          <directionalLight
            position={[5, 8, 5]}
            intensity={3}
          />

          <directionalLight
            position={[-5, 4, -4]}
            intensity={1.5}
          />

          <Environment
            preset="city"
          />

          <RobotArm
            joints={joints}
          />

          <Grid
            infiniteGrid
            cellSize={0.5}
            sectionSize={2.5}
            fadeDistance={20}
            fadeStrength={1}
          />

          <OrbitControls />
        </Canvas>
      </div>


      <div
        style={{
          width: 350,
          padding: 25,
          background: "#15181d",
          borderLeft:
            "1px solid #292d33",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >

        <h1
          style={{
            marginTop: 0,
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          VIRTUAL ARM
        </h1>

        <p
          style={{
            color: "#8e969f",
            fontSize: 13,
          }}
        >
          6-AXIS ROBOTIC SIMULATOR
        </p>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >

          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: connected
                ? "#35d07f"
                : "#ff4538",
              boxShadow: connected
                ? "0 0 8px #35d07f"
                : "0 0 8px #ff4538",
            }}
          />

          <span
            style={{
              color: connected
                ? "#35d07f"
                : "#ff4538",
              fontSize: 12,
            }}
          >
            {connected
              ? "BACKEND CONNECTED"
              : "BACKEND OFFLINE"}
          </span>

        </div>


        <hr
          style={{
            borderColor: "#292d33",
          }}
        />


        <h3>
          JOINT CONTROL
        </h3>


        {joints.map(
          (angle, index) => (
            <JointControl
              key={index}
              index={index}
              value={angle}
              onChange={
                updateJoint
              }
            />
          )
        )}


        <button
          onClick={homeRobot}
          style={{
            width: "100%",
            padding: 13,
            background: "#d6a84f",
            color: "#111",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          HOME POSITION
        </button>

      </div>

    </div>
  );
}

export default App;