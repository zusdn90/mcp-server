import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { faker } from "@faker-js/faker";

// MCP 서버 인스턴스 생성
const server = new McpServer({
    name: "MockUserDataServer",
    version: "1.0.0",
});

// 사용자 mock 데이터 생성 도구 등록
type UserMockParams = {
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    address?: boolean;
    count?: number;
};

const userMockSchema = z.object({
    name: z.boolean().optional().default(true),
    email: z.boolean().optional().default(true),
    phone: z.boolean().optional().default(true),
    address: z.boolean().optional().default(true),
    count: z.number().int().min(1).max(100).optional().default(1),
});

server.tool(
    "generate-user-mock",
    userMockSchema,
    async (params: UserMockParams) => {
        const { name, email, phone, address, count } = userMockSchema.parse(params);
        const users = Array.from({ length: count }, () => {
            const user: Record<string, string> = {};
            if (name) user.name = faker.person.fullName();
            if (email) user.email = faker.internet.email();
            if (phone) user.phone = faker.phone.number();
            if (address) user.address = faker.location.streetAddress() + ", " + faker.location.city() + ", " + faker.location.state() + " " + faker.location.zipCode();
            return user;
        });
        return {
            content: [{ type: "json", json: users.length === 1 ? users[0] : users }],
        };
    }
);

// MCP 서버 stdio 연결 및 실행
const transport = new StdioServerTransport();
server.connect(transport); 